package com.b107.interview.domain.review.entity;

import com.b107.interview.domain.resume.entity.Resume;
import com.b107.interview.domain.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    @Column(length = 30, nullable = false)
    private String reviewCompanyName;

    @Column(nullable = false)
    private Short reviewYear;

    @Column(length = 3, nullable = false)
    private String reviewQuarter;

    @Column(length = 3, nullable = false)
    private String employmentType;

    @Column(length = 5, nullable = false)
    private String reviewOrder;

    @Column(length = 20, nullable = false)
    private String reviewJob;

    @Column(length = 50, nullable = false)
    private String reviewQuestion;

    @Column(length = 2000, nullable = false)
    private String reviewContent;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "resume_id")
    private Resume resume;
}
