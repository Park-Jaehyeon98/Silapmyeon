package com.b107.interview.domain.resume.repository;

import com.b107.interview.domain.resume.entity.Resume;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ResumeRepository extends JpaRepository<Resume, Long> {
    @Query(value = "select r from Resume r where r.user.userId = :userId")
    Page<Resume> findAllByUserId(Pageable pageable, Long userId);

}
