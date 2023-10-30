package com.b107.interview.domain.board.controller;

import com.b107.interview.domain.board.dto.BoardAllResponse;
import com.b107.interview.domain.board.dto.BoardRequest;
import com.b107.interview.domain.board.dto.BoardResponse;
import com.b107.interview.domain.board.dto.UpdateBoardRequest;
import com.b107.interview.domain.board.entity.Board;
import com.b107.interview.domain.board.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
public class BoardController {

    private final BoardService boardService;

    //게시판 글 작성
    @PostMapping("/boards")
    public ResponseEntity<BoardAllResponse> registBoard(@RequestBody BoardRequest request){
        Board board = boardService.save(request);
        BoardAllResponse response = new BoardAllResponse(board);

        return ResponseEntity.ok()
                .body(response);
    }

    //게시판 글 전체 조회
    @GetMapping("/boards")
    public ResponseEntity<List<BoardAllResponse>> findAllBoards(){
        List<BoardAllResponse> boards = boardService.findAll()
                .stream()
                .map(BoardAllResponse::new)
                .collect(Collectors.toList());

        return ResponseEntity.ok()
                .body(boards);
    }

    //게시판 글 상세 조회
    @GetMapping("/boards/{id}")
    public ResponseEntity<BoardResponse> findBoard(@PathVariable Long id){
        BoardResponse boardResponse = boardService.findBoard(id);


        return ResponseEntity.ok()
                .body(boardResponse);
    }

    //게시판 글 삭제
    @DeleteMapping("/boards/{id}")
    public ResponseEntity<Void> deleteBoard(@PathVariable Long id){
        boardService.deleteBoard(id);


        return ResponseEntity.ok()
                .build();
    }

    //게시판 글 수정
    @PutMapping("/boards/{id}")
    public ResponseEntity<Board> updateBoard(@PathVariable Long id, @RequestBody UpdateBoardRequest request){
        Board updateBoard = boardService.update(id,request);

        return ResponseEntity.ok()
                .body(updateBoard);
    }


}

