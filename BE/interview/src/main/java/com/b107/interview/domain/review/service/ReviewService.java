package com.b107.interview.domain.review.service;

import com.b107.interview.domain.resume.entity.Resume;
import com.b107.interview.domain.resume.service.ResumeService;
import com.b107.interview.domain.review.entity.Review;
import com.b107.interview.domain.review.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.Optional;

@Transactional
@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final ResumeService resumeService;

    //면접 후기 작성
    public Review createReview(Review review) {
        Resume foundResume = resumeService.readResume(review.getResume().getResumeId(), review.getUser().getUserId());
        review.setResume(foundResume);
        return reviewRepository.save(review);
    }

    //면접 후기 수정
    public Review updateReview(Review review, Long reviewId) {
        Review foundReview = readReview(reviewId, review.getUser().getUserId());

        foundReview.setEmploymentType(review.getEmploymentType());
        foundReview.setReviewOrder(review.getReviewOrder());
        foundReview.setReviewJob(review.getReviewJob());
        foundReview.setReviewQuestion(review.getReviewQuestion());
        foundReview.setReviewContent(review.getReviewContent());

        return foundReview;
    }

    //면접 후기 조회
    public Review readReview(Long reviewId, Long userId) {
        Optional<Review> optionalReview = reviewRepository.findById(reviewId);
        if (optionalReview.isEmpty()) {
            throw new RuntimeException("존재하지 않는 면접 후기입니다.");
        }

        Review review = optionalReview.get();

        if (!Objects.equals(review.getUser().getUserId(), userId)) {
            throw new RuntimeException("권한이 없는 사용자입니다.");
        }

        return optionalReview.get();
    }

    //면접 후기 페이지 조회
    public Page<Review> readReviews(Pageable pageable, Long userId, String keyword) {
        return reviewRepository.findAllByUserIdAndCompanyName(pageable, userId, keyword);
    }

    //면접 후기 삭제
    public void deleteReview(Long reviewId, Long userId) {
        Review foundReview = readReview(reviewId, userId);
        reviewRepository.delete(foundReview);
    }
}
