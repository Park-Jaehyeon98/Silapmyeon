package com.b107.interview.domain.report.entity;

import lombok.Builder;
import lombok.Getter;

@Getter @Builder
public class Interview {

    private String question;
    private String answer;

    public static Interview of(String question, String answer) {
        return Interview.builder()
                .question(question)
                .answer(answer)
                .build();
    }
}
