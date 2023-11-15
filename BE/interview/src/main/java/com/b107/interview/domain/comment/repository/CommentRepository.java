package com.b107.interview.domain.comment.repository;

import com.b107.interview.domain.board.entity.Board;
import com.b107.interview.domain.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment,Long> {
    List<Comment> findAllByBoard(Board board);

    void deleteAllByBoard(Board board);
}
