package com.b107.interview.domain.resume.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class ResumeReqDto {
    private String companyName;
    private LocalDate interviewDate;
    private Long user;
    private List<ResumeItemReqDto> resumeItems;
}
