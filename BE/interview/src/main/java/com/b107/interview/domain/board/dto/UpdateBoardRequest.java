package com.b107.interview.domain.board.dto;

import lombok.Getter;

@Getter
public class UpdateBoardRequest {
    private String title;
    private String content;
    private String postId;
}
