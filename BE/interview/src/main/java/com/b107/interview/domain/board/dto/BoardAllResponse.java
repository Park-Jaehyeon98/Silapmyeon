package com.b107.interview.domain.board.dto;

import com.b107.interview.domain.board.entity.Board;
import lombok.Getter;

import java.time.LocalDateTime;


@Getter
public class BoardAllResponse {
    private final Long BoardId;
    private final String title;
    private final String content;
    private final Long hit;
    private final String nickname;
    private final LocalDateTime createdTime;
    private final String imgUrl;
    private final Integer commentCnt;

    public BoardAllResponse(Board board) {
        this.BoardId = board.getBoardId();
        this.title = board.getBoardTitle();
        this.content = board.getBoardContent();
        this.hit = board.getBoardHit();
        this.nickname = board.getUser().getUserNickname();
        this.createdTime = board.getCreatedTime();
        this.imgUrl = board.getUser().getUserProfileUrl();
        this.commentCnt = board.getComments() ==null ? 0:board.getComments().size();
    }
}

