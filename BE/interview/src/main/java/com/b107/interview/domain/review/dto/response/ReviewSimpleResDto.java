package com.b107.interview.domain.review.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewSimpleResDto {
    private Long reviewId;
    private String reviewCompanyName;
    private Short reviewYear;
    private String reviewQuarter;
    private String employmentType;
    private String reviewOrder;
    private String reviewJob;
    private String reviewQuestion;
    private Long resumeId;
}
