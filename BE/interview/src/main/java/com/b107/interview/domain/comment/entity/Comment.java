package com.b107.interview.domain.comment.entity;

import com.b107.interview.domain.board.entity.Board;
import com.b107.interview.domain.user.entity.User;
import com.b107.interview.util.Auditable;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.nio.file.attribute.UserPrincipalLookupService;

@Entity
@Getter
@NoArgsConstructor
public class Comment extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @Column(nullable = false, length = 255)
    private String commentContent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;


    public void setCommentContent(String commentContent){
        this.commentContent = commentContent;
    }

    public void regist(User user, Board board){
        this.user = user;
        this.board = board;
    }


}
