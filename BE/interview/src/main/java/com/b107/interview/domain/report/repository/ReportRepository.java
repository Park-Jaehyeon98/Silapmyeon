package com.b107.interview.domain.report.repository;

import com.b107.interview.domain.report.entity.Report;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportRepository extends MongoRepository<Report, String> {

    List<Report> findByUserId(Long userId);

    boolean existsUserByUserId(Long userId);
}
