package com.b107.interview.domain.report.dto.request;

import com.b107.interview.domain.report.entity.Interview;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.List;

@Getter @Builder
public class ReportRequest {

    @Positive(message = "userId는 양수여야 합니다.")
    private Long userId;

    @NotNull(message = "스크립트는 비어있을 수 없습니다.")
    private List<Interview> interviews;

    @Positive(message = "아이트래킹 위반 횟수는 양수여야 합니다.")
    private int eyeTrackingViolationCount;

    public static ReportRequest of(Long userId, List<Interview> interviews, int eyeTrackingViolationCount) {
        return ReportRequest.builder()
                .userId(userId)
                .interviews(interviews)
                .eyeTrackingViolationCount(eyeTrackingViolationCount)
                .build();
    }
}
