package com.b107.interview.domain.report.dto.response;

import com.b107.interview.domain.report.entity.Report;
import com.b107.interview.util.DateTimeConverter;
import lombok.Builder;
import lombok.Getter;

@Getter @Builder
public class ReportsResponse {
    private String id;
    private String company;
    private String createdTime;

    public static ReportsResponse of(String id, String company, String createdTime) {
        return ReportsResponse.builder()
                .id(id)
                .company(company)
                .createdTime(createdTime)
                .build();
    }

    public static ReportsResponse from(Report report) {
        return ReportsResponse.of(report.getId(), report.getCompany(), DateTimeConverter.toString(report.getCreatedDate()));
    }
}
