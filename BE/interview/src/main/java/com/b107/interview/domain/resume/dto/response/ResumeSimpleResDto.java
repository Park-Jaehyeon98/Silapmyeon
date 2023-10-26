package com.b107.interview.domain.resume.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class ResumeSimpleResDto {
    private Long resumeId;
    private String companyName;
    private LocalDate interviewDate;
    private LocalDateTime createdTime;
    private LocalDateTime modifiedTime;
    private Long reviewId;
}
