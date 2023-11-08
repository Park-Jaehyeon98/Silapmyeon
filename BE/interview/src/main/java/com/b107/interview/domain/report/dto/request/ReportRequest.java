package com.b107.interview.domain.report.dto.request;

import com.b107.interview.domain.report.entity.Interview;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;
import java.util.List;

@Getter @Builder
public class ReportRequest {

    @Positive(message = "userId는 양수여야 합니다.")
    private Long userId;

    private String company;

    @NotNull(message = "스크립트는 비어있을 수 없습니다.")
    private List<InterviewRequest> interviews;

    @PositiveOrZero(message = "아이트래킹 위반 횟수는 0 또는 양수여야 합니다.")
    private int eyeTrackingViolationCount;

    public static ReportRequest of(Long userId, List<InterviewRequest> interviews, int eyeTrackingViolationCount, String company) {
        return ReportRequest.builder()
                .userId(userId)
                .company(company)
                .interviews(interviews)
                .eyeTrackingViolationCount(eyeTrackingViolationCount)
                .build();
    }
}
