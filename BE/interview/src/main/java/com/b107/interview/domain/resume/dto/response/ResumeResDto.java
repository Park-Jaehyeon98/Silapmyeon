package com.b107.interview.domain.resume.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class ResumeResDto {
    private Long resumeId;
    private String companyName;
    private LocalDate interviewDate;
    private LocalDateTime createdTime;
    private LocalDateTime modifiedTime;
    private List<ResumeItemResDto> resumeItems;
    private Long reviewId;
}
