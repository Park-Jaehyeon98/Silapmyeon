package com.b107.interview.domain.comment.service;

import com.b107.interview.domain.board.dto.BoardResponse;
import com.b107.interview.domain.board.entity.Board;
import com.b107.interview.domain.board.repository.BoardRepository;
import com.b107.interview.domain.comment.dto.CommentRequest;
import com.b107.interview.domain.comment.entity.Comment;
import com.b107.interview.domain.comment.mapper.CommentMapper;
import com.b107.interview.domain.comment.repository.CommentRepository;
import com.b107.interview.domain.user.entity.User;
import com.b107.interview.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@RequiredArgsConstructor //final이 붙은거 생성자 추가
@Service
public class CommentService {

     private final CommentRepository commentRepository;
     private final UserRepository userRepository;
     private final BoardRepository boardRepository;
     private final CommentMapper commentMapper;

    //댓글 작성
     @Transactional
    public Comment save(CommentRequest request){

         User user = userRepository.findById(request.getUserId())
                 .orElseThrow(()-> new IllegalArgumentException("not found user"));
         Board board = boardRepository.findById(request.getBoardId())
                 .orElseThrow(()-> new IllegalArgumentException("not found board"));
         Comment comment = commentMapper.commnetRequestToComment(request);
         comment.regist(user,board);

         return commentRepository.save(comment);
     }

     //댓글 삭제
     public void deleteComment(Long id){
          commentRepository.deleteById(id);
     }

     public List<Comment> findAllByBoard(Board board){
         return commentRepository.findAllByBoard(board);
     }

    public void deleteAllByBoard(Board board){
        commentRepository.deleteAllByBoard(board);
    }

     //댓글 게시글 별로 조회
    public List<Comment> findComment(Board board){
         return commentRepository.findAllByBoard(board);

    }

    //댓글 게시글 별로 삭제
    public void deleteAllComment(Board board){
         commentRepository.deleteAllByBoard(board);
    }

}
