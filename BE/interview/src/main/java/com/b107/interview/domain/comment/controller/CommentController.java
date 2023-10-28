package com.b107.interview.domain.comment.controller;

import com.b107.interview.domain.comment.dto.CommentRequest;
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
    @GetMapping("/comments")
    public ResponseEntity<Comment> registComment(@RequestBody CommentRequest request){
        Comment comment = commentService.save(request);

        return ResponseEntity.ok()
                .body(comment);
    }

    //댓글 삭제
    @DeleteMapping("/comments/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id){
        commentService.deleteComment(id);

        return ResponseEntity.ok()
                .build();
    }
}
