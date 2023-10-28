package com.b107.interview.domain.board.dto;

import com.b107.interview.domain.board.entity.Board;
import lombok.Getter;


@Getter
public class BoardAllResponse {
    private final String title;
    private final String content;
    private final Long hit;
    private final String nickname;

    public BoardAllResponse(Board board) {
        this.title = board.getBoardTitle();
        this.content = board.getBoardContent();
        this.hit = board.getBoardHit();
        this.nickname = board.getUser().getUserNickname();
    }
}

