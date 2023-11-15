package com.b107.interview.domain.review.mapper;

import com.b107.interview.domain.review.dto.request.ReviewReqDto;
import com.b107.interview.domain.review.dto.response.ReviewResDto;
import com.b107.interview.domain.review.dto.response.ReviewSimpleResDto;
import com.b107.interview.domain.review.entity.Review;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ReviewMapper {
    @Mapping(source = "resumeId", target = "resume.resumeId")
    @Mapping(source = "userId", target = "user.userId")
    Review reviewReqDtoToReview(ReviewReqDto reviewReqDto);

    @Mapping(source = "resume.resumeId", target = "resumeId")
    @Mapping(source = "resume.companyName", target = "companyName")
    @Mapping(source = "resume.interviewDate", target = "interviewDate")
    ReviewResDto reviewToReviewResDto(Review review);

    @Mapping(source = "resume.resumeId", target = "resumeId")
    @Mapping(source = "resume.companyName", target = "companyName")
    @Mapping(source = "resume.interviewDate", target = "interviewDate")
    ReviewSimpleResDto reviewToReviewSimpleResDto(Review review);
}
