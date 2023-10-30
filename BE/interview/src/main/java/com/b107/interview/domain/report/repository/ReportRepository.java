package com.b107.interview.domain.report.repository;

import com.b107.interview.domain.report.entity.Report;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReportRepository extends MongoRepository<Report, String> {

    Optional<Report> findByUserId(Long userId);

    boolean existsByUserId(Long userId);
}
