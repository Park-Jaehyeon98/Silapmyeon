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

import java.util.Optional;

@Transactional
@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final ResumeService resumeService;

    //면접 후기 작성
    public Review createReview(Review review) {
        Resume foundResume = resumeService.readResume(review.getResume().getResumeId());

        review.setReviewCompanyName(foundResume.getCompanyName());
        review.setReviewYear((short) foundResume.getInterviewDate().getYear());
        review.setReviewQuarter(setQuarter(foundResume.getInterviewDate().getMonthValue()));

        return reviewRepository.save(review);
    }

    //면접 후기 수정
    public Review updateReview(Review review, Long reviewId) {
        Review foundReview = readReview(reviewId);

        Resume foundResume = resumeService.readResume(review.getResume().getResumeId());

        foundReview.setReviewCompanyName(foundResume.getCompanyName());
        foundReview.setReviewYear((short) foundResume.getInterviewDate().getYear());
        foundReview.setReviewQuarter(setQuarter(foundResume.getInterviewDate().getMonthValue()));

        foundReview.setEmploymentType(review.getEmploymentType());
        foundReview.setReviewOrder(review.getReviewOrder());
        foundReview.setReviewJob(review.getReviewJob());
        foundReview.setReviewQuestion(review.getReviewQuestion());
        foundReview.setReviewContent(review.getReviewContent());

        return foundReview;
    }

    //면접 후기 조회
    public Review readReview(Long reviewId) {
        Optional<Review> optionalReview = reviewRepository.findById(reviewId);
        if (optionalReview.isEmpty()) {
            throw new RuntimeException("존재하지 않는 면접 후기입니다.");
        }
        return optionalReview.get();
    }

    //면접 후기 페이지 조회
    public Page<Review> readReviews(Pageable pageable) {
        return reviewRepository.findAll(pageable);
    }

    //면접 후기 삭제
    public void deleteReview(Long reviewId) {
        Review foundReview = readReview(reviewId);
        foundReview.getResume().setReview(null);
    }

    //분기 설정
    private String setQuarter(int month) {
        StringBuilder quarter = new StringBuilder("분기");

        if (month <= 3) quarter.insert(0, 1);
        else if (month <= 6) quarter.insert(0, 2);
        else if (month <= 9) quarter.insert(0, 3);
        else quarter.insert(0, 4);

        return quarter.toString();
    }
}
