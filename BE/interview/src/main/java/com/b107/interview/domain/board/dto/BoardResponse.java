package com.b107.interview.domain.board.dto;

import com.b107.interview.domain.board.entity.Board;
import com.b107.interview.domain.comment.dto.CommentResponse;
import com.b107.interview.domain.comment.entity.Comment;
import com.b107.interview.domain.user.entity.User;
import lombok.Getter;

import java.util.List;

@Getter
public class BoardResponse {
    private final Long boardId;
    private final String title;
    private final String content;
    private final Long hit;
    private final String nickname;
    private final Long userId;
    private final String reportId;
    private final List<CommentResponse> comments;


    public BoardResponse(Board board,List<CommentResponse> comments){
        this.boardId = board.getBoardId();
        this.title = board.getBoardTitle();
        this.content = board.getBoardContent();
        this.hit = board.getBoardHit();
        this.nickname = board.getUser().getUserNickname();
        this.userId = board.getUser().getUserId();
        this.reportId = board.getReportId();
        this.comments = comments;
    }






}

