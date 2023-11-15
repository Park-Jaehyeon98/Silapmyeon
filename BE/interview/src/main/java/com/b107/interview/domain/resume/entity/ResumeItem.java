package com.b107.interview.domain.resume.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class ResumeItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long resumeItemId;

    @Column(length = 255, nullable = false)
    private String resumeQuestion;

    @Column(length = 1500, nullable = false)
    private String resumeAnswer;

    @ManyToOne
    @JoinColumn(name = "resume_id")
    private Resume resume;
}
