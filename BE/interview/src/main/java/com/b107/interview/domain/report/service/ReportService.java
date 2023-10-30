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
                .orElseThrow(() -> new RuntimeException("해당 레포트가 존재하지 않습니다."));

        return ReportResponse.from(report);
    }


    public List<ReportResponse> getReportsByUserId(Long userId) {

        //체크 로직
        return reportRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("해당 유저의 레포트가 존재하지 않습니다."))
                .stream()
                .map(ReportResponse::from)
                .collect(Collectors.toList());
    }

    public void deleteReport(String id) {
        if (!reportRepository.existsById(id)) {
            throw new RuntimeException("존재하지 않는 레포트 입니다.");
        }
        reportRepository.deleteById(id);
    }
}
