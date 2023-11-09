package com.b107.interview.domain.review.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ReviewSimpleResDto {
    private Long reviewId;
    private String companyName;
    private LocalDate interviewDate;
    private String employmentType;
    private String reviewOrder;
    private String reviewJob;
    private String reviewQuestion;
    private Long resumeId;
}
