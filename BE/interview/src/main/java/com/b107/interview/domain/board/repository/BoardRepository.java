package com.b107.interview.domain.board.repository;

import com.b107.interview.domain.board.dto.BoardAllResponse;
import com.b107.interview.domain.board.entity.Board;
import com.b107.interview.domain.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board,Long> {
    List<Board> findByBoardTitleContaining(String title);
    Page<Board> findByBoardTitleContaining(Pageable pageable, String search);
}
