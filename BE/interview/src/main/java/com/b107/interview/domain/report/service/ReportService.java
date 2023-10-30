package com.b107.interview.domain.report.service;

import com.b107.interview.domain.report.dto.request.ReportRequest;
import com.b107.interview.domain.report.dto.response.ReportResponse;
import com.b107.interview.domain.report.entity.Report;
import com.b107.interview.domain.report.repository.ReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ReportService {

    private static final String NOT_FOUND_REPORT = "레포트가 존재하지 않습니다.";

    private final ReportRepository reportRepository;

    @Transactional
    public Report createReport(ReportRequest reportRequest, String scenarioUrl) {
        Report report = Report.of(
                reportRequest.getUserId(),
                reportRequest.getInterviews(),
                reportRequest.getEyeTrackingViolationCount(),
                scenarioUrl
                );

        return reportRepository.save(report);
    }


    public ReportResponse getReportDetailsById(String id) {
        Report report = reportRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(NOT_FOUND_REPORT));

        return ReportResponse.from(report);
    }


    public List<ReportResponse> getReportsByUserId(Long userId) {
        //체크 로직
        List<Report> reports = reportRepository.findByUserId(userId);

        if (reports.isEmpty()) {
            throw new RuntimeException(NOT_FOUND_REPORT);
        }

        return reports.stream()
                .map(ReportResponse::from)
                .collect(Collectors.toList());
    }

    public void deleteReport(String id) {
        if (!reportRepository.existsById(id)) {
            throw new RuntimeException(NOT_FOUND_REPORT);
        }
        reportRepository.deleteById(id);
    }
}
