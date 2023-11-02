package com.b107.interview.domain.board.service;

import com.b107.interview.domain.board.dto.BoardAllResponse;
import com.b107.interview.domain.board.dto.BoardRequest;
import com.b107.interview.domain.board.dto.BoardResponse;
import com.b107.interview.domain.board.dto.UpdateBoardRequest;
import com.b107.interview.domain.board.entity.Board;
import com.b107.interview.domain.board.mapper.BoardMapper;
import com.b107.interview.domain.board.repository.BoardRepository;
import com.b107.interview.domain.comment.dto.CommentResponse;
import com.b107.interview.domain.comment.service.CommentService;
import com.b107.interview.domain.user.entity.User;
import com.b107.interview.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class BoardService {

    private final BoardRepository boardRepository;
    private final CommentService commentService;
    private final UserRepository userRepository;
    private final BoardMapper boardMapper;

    //게시글 작성
    @Transactional
    public Board save(BoardRequest request){
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(()->new IllegalArgumentException("not found user" ));
        Board board = boardMapper.boardRequestToBoard(request);
        board.regist(user);
        return boardRepository.save(board);
    }

    //게시글 전체 조회
    public List<Board> findAll(){
        return boardRepository.findAll();
    }

    //게시글 상세 조회
    @Transactional
    public BoardResponse findBoard(Long id){
        Board board = boardRepository.findById(id)
                .orElseThrow(()->new IllegalArgumentException("not find :"+id));

        board.hits(board.getBoardHit());
        List<CommentResponse> comments = commentService.findAllByBoard(board)
                .stream()
                .map(CommentResponse::new)
                .collect(Collectors.toList());

        return new BoardResponse(board,comments);
    }

    //게시글 삭제
    @Transactional
    public void deleteBoard(Long id){

        Board board = boardRepository.findById(id)
                        .orElseThrow(()-> new IllegalArgumentException("not find:"+id));

        commentService.deleteAllByBoard(board);
        boardRepository.deleteById(id);
    }

    //게시글 수정
    @Transactional
    public BoardResponse update(Long id, UpdateBoardRequest request){
        Board board = boardRepository.findById(id)
                .orElseThrow(()->new IllegalArgumentException("not find" + id));

        board.update(request.getTitle(),request.getContent(),request.getPostId());

        List<CommentResponse> comments = commentService.findAllByBoard(board)
                .stream()
                .map(CommentResponse::new)
                .collect(Collectors.toList());
        return new BoardResponse(board,comments);
    }


}
