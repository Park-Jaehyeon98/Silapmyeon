package com.b107.interview.domain.board.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;


@NoArgsConstructor //기본 생성자 추가
@AllArgsConstructor //모든 필드 값을 파라미터로 받는 생성자
@Getter
public class BoardRequest {

    private String title;
    private String content;
    private Long userId;
    private String reportId;

}
