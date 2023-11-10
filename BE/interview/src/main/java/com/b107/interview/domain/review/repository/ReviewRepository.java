package com.b107.interview.domain.review.repository;

import com.b107.interview.domain.review.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    @Query(value = "select r from Review r where r.user.userId = :userId and r.resume.resumeId in " +
            "(select rs.resumeId from Resume rs where rs.companyName like concat('%', coalesce(:keyword, ''), '%')) ")
    Page<Review> findAllByUserIdAndCompanyName(Pageable pageable, Long userId, String keyword);
}
