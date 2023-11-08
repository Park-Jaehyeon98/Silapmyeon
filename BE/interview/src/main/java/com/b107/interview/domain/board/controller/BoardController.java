package com.b107.interview.domain.board.controller;

import com.b107.interview.domain.board.dto.*;
import com.b107.interview.domain.board.entity.Board;
import com.b107.interview.domain.board.service.BoardService;
import com.b107.interview.domain.comment.dto.CommentResponse;
import com.b107.interview.domain.report.dto.response.ReportResponse;
import com.b107.interview.domain.report.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
public class BoardController {

    private final BoardService boardService;
    private final ReportService reportService;

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
    public ResponseEntity<Page<BoardAllResponse>> findAllBoards(@PageableDefault(sort = "boardId", direction = Sort.Direction.DESC, size = 9) Pageable pageable) {

        Page<BoardAllResponse> boards = boardService.findAll(pageable)
                .map(BoardAllResponse::new);

        return ResponseEntity.ok()
                .body(boards);
    }

    //게시판 글 상세 조회
    @GetMapping("/boards/{id}")
    public ResponseEntity<BoardResponseWrapper> findBoard(@PathVariable Long id){
        BoardResponse boardResponse = boardService.findBoard(id);
        String boardId = boardResponse.getReportId();
        ReportResponse reportResponse = null;

        if(boardId !=null){
            reportResponse = reportService.getReportDetailsById(boardId);
        }

        BoardResponseWrapper response = new BoardResponseWrapper(boardResponse,reportResponse);
        return ResponseEntity.ok()
                .body(response);
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
    public ResponseEntity<BoardResponse> updateBoard(@PathVariable Long id, @RequestBody UpdateBoardRequest request){
        BoardResponse updateBoard = boardService.update(id,request);

        return ResponseEntity.ok()
                .body(updateBoard);
    }

    @GetMapping("/boards/search")
    public  List<BoardAllResponse> searchBoard(@RequestParam String search){
        System.out.println("검색하기!!");
        List<BoardAllResponse> searchBoard = boardService.findBySearch(search)
                .stream()
                .map(BoardAllResponse::new)
                .collect(Collectors.toList());
        return searchBoard;


    }
}

