package com.b107.interview.domain.review.controller;

import com.b107.interview.domain.review.dto.request.ReviewReqDto;
import com.b107.interview.domain.review.dto.response.ReviewResDto;
import com.b107.interview.domain.review.dto.response.ReviewSimpleResDto;
import com.b107.interview.domain.review.entity.Review;
import com.b107.interview.domain.review.mapper.ReviewMapper;
import com.b107.interview.domain.review.service.ReviewService;
import com.b107.interview.util.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/review")
public class ReviewController {
    private final ReviewService reviewService;
    private final ReviewMapper reviewMapper;

    //면접 후기 작성
    @PostMapping
    public ResponseEntity<?> postReview(@RequestBody ReviewReqDto reviewReqDto) {
        reviewReqDto.setUserId(SecurityUtils.getUser().getUserId());
        Review review = reviewMapper.reviewReqDtoToReview(reviewReqDto);
        Review createdReview = reviewService.createReview(review);
        ReviewResDto reviewResDto = reviewMapper.reviewToReviewResDto(createdReview);
        return new ResponseEntity<>(reviewResDto, HttpStatus.CREATED);
    }

    //면접 후기 수정
    @PutMapping("/{review-id}")
    public ResponseEntity<?> putReview(@PathVariable("review-id") Long reviewId, @RequestBody ReviewReqDto reviewReqDto) {
        reviewReqDto.setUserId(SecurityUtils.getUser().getUserId());
        Review review = reviewMapper.reviewReqDtoToReview(reviewReqDto);
        Review updatedReview = reviewService.updateReview(review, reviewId);
        ReviewResDto reviewResDto = reviewMapper.reviewToReviewResDto(updatedReview);
        return new ResponseEntity<>(reviewResDto, HttpStatus.OK);
    }

    //면접 후기 상세 조회
    @GetMapping("/{review-id}")
    public ResponseEntity<?> getReview(@PathVariable("review-id") Long reviewId) {
        Review foundReview = reviewService.readReview(reviewId, SecurityUtils.getUser().getUserId());
        ReviewResDto reviewResDto = reviewMapper.reviewToReviewResDto(foundReview);
        return new ResponseEntity<>(reviewResDto, HttpStatus.OK);
    }

    //면접 후기 전체 조회
    @GetMapping
    public ResponseEntity<?> getReviews(@PageableDefault(sort = "reviewId", direction = Sort.Direction.DESC)Pageable pageable) {
        Page<Review> reviewPage = reviewService.readReviews(pageable, SecurityUtils.getUser().getUserId());
        Page<ReviewSimpleResDto> reviewSimpleResDtos = reviewPage.map(review -> reviewMapper.reviewToReviewSimpleResDto(review));
        return new ResponseEntity<>(reviewSimpleResDtos, HttpStatus.OK);
    }

    //면접 후기 삭제
    @DeleteMapping("/{review-id}")
    public ResponseEntity<?> deleteReview(@PathVariable("review-id") Long reviewId) {
        reviewService.deleteReview(reviewId, SecurityUtils.getUser().getUserId());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
