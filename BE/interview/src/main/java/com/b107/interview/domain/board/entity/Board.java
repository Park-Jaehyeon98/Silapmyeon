package com.b107.interview.domain.board.entity;

import com.b107.interview.domain.comment.entity.Comment;
import com.b107.interview.domain.user.entity.User;
import com.b107.interview.util.Auditable;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class Board extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardId;

    @Column(length = 50, nullable = false)
    private String boardTitle;

    @Column(length = 255, nullable = false)
    private String boardContent;

    @Column(nullable = false)
    private Long boardHit;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments;


    // Setter 메서드 추가
    public void setBoardTitle(String boardTitle) {
        this.boardTitle = boardTitle;
    }

    public void setBoardContent(String boardContent) {
        this.boardContent = boardContent;
    }

    //처음 커뮤니티 등록할때 user객체, 조회수 0으로
    public void regist(User user){
        this.user = user;
        this.boardHit=Long.valueOf(0);
    }

    //글 수정 하기
    public void update(String title, String content){
        this.boardTitle = title;
        this.boardContent = content;
    }
    //조회수 증가
    public void hits(long hits){
        this.boardHit = hits+1;
    }



}
