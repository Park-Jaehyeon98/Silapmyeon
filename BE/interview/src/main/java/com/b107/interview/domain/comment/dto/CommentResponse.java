package com.b107.interview.domain.comment.dto;

import com.b107.interview.domain.comment.entity.Comment;
import lombok.Getter;

@Getter
public class CommentResponse {
    private final String content;
    private final String nickname;

    public CommentResponse(Comment comment){
        this.content = comment.getCommentContent();
        this.nickname = comment.getUser().getUserNickname();
    }



}
