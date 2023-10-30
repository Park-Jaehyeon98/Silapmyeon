package com.b107.interview.domain.comment.controller;

import com.b107.interview.domain.board.dto.UpdateBoardRequest;
import com.b107.interview.domain.board.entity.Board;
import com.b107.interview.domain.comment.dto.CommentRequest;
import com.b107.interview.domain.comment.dto.CommentResponse;
import com.b107.interview.domain.comment.entity.Comment;
import com.b107.interview.domain.comment.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class CommentController {

    private final CommentService commentService;

    //댓글 작성
    @PostMapping("/comments")
    public ResponseEntity<CommentResponse> registComment(@RequestBody CommentRequest request){
        Comment comment = commentService.save(request);
        CommentResponse response = new CommentResponse(comment);

        return ResponseEntity.ok()
                .body(response);
    }

    //댓글 수정
    @PutMapping("/comments/{id}")
    public ResponseEntity<CommentResponse> updateBoard(@PathVariable Long id, @RequestBody CommentRequest request){
        Comment updateComment = commentService.update(id,request);
        CommentResponse response = new CommentResponse(updateComment);

        return ResponseEntity.ok()
                .body(response);
    }

    //댓글 삭제
    @DeleteMapping("/comments/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id){
        commentService.deleteComment(id);

        return ResponseEntity.ok()
                .build();
    }
}
