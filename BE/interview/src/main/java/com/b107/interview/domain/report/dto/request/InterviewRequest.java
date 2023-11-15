package com.b107.interview.domain.report.dto.request;

import com.b107.interview.domain.report.entity.Interview;
import lombok.Builder;
import lombok.Getter;

@Getter @Builder
public class InterviewRequest {
    private String question;
    private String answer;
    private String key;

    public static InterviewRequest of(String question, String answer, String key) {
        return InterviewRequest.builder()
                .question(question)
                .answer(answer)
                .key(key)
                .build();
    }

    public void setKey(String url) {
        this.key = url;
    }
}
