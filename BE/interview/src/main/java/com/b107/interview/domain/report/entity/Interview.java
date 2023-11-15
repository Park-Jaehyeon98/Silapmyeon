package com.b107.interview.domain.report.entity;

import com.b107.interview.domain.report.dto.request.InterviewRequest;
import lombok.Builder;
import lombok.Getter;

@Getter @Builder
public class Interview {

    private String question;
    private String answer;
    private String url;

    public static Interview of(String question, String answer, String url) {
        return Interview.builder()
                .question(question)
                .answer(answer)
                .url(url)
                .build();
    }
}
