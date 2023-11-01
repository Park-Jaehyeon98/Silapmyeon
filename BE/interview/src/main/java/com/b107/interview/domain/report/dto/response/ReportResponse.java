package com.b107.interview.domain.report.dto.response;

import com.b107.interview.domain.report.entity.Interview;
import com.b107.interview.domain.report.entity.Report;
import com.b107.interview.util.DateTimeConverter;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter @Builder
public class ReportResponse {
    private String id;
    private Long userId;
    private List<Interview> interviews;
    private int eyeTrackingViolationCount;
    private String scenarioUrl;
    private String createdTime;
    private String modifiedTime;

    public static ReportResponse of(String id, Long userId,
                                    List<Interview> interviews,
                                    int eyeTrackingViolationCount,
                                    String scenarioUrl,
                                    String createdTime,
                                    String modifiedTime
                                    ) {
        return ReportResponse.builder()
                .id(id)
                .userId(userId)
                .interviews(interviews)
                .eyeTrackingViolationCount(eyeTrackingViolationCount)
                .scenarioUrl(scenarioUrl)
                .createdTime(createdTime)
                .modifiedTime(modifiedTime)
                .build();
    }

    public static ReportResponse from(Report report) {
        return ReportResponse.of(report.getId(), report.getUserId(),
                report.getInterviews(), report.getEyeTrackingViolationCount(),
                report.getScenarioUrl(), DateTimeConverter.toString(report.getCreatedDate()),
                DateTimeConverter.toString(report.getLastModifiedDate()));
    }
}
