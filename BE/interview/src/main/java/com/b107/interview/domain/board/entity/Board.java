package com.b107.interview.domain.board.entity;

import com.b107.interview.domain.comment.entity.Comment;
import com.b107.interview.domain.user.entity.User;
import com.b107.interview.util.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
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

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments;

}
