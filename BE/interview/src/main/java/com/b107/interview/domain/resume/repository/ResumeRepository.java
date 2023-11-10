package com.b107.interview.domain.resume.repository;

import com.b107.interview.domain.resume.entity.Resume;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ResumeRepository extends JpaRepository<Resume, Long> {
    @Query(value = "select r from Resume r where r.user.userId = :userId and r.companyName like concat('%', coalesce(:keyword, ''), '%')")
    Page<Resume> findAllByUserIdAndCompanyName(Pageable pageable, Long userId, String keyword);

    @Query(value = "select r from Resume r where r.user.userId = :userId order by r.resumeId desc ")
    List<Resume> findAllByUserId(Long userId);
}
