package com.b107.interview.domain.review.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewReqDto {
    private Long resumeId;
    private String employmentType;
    private String reviewOrder;
    private String reviewJob;
    private String reviewQuestion;
    private String reviewContent;
    private Long userId;
}
