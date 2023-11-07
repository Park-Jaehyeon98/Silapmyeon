package com.b107.interview.domain.report.service;

import com.b107.interview.commons.image.S3Service;
import com.b107.interview.domain.report.dto.request.InterviewRequest;
import com.b107.interview.domain.report.dto.request.ReportRequest;
import com.b107.interview.domain.report.dto.response.ReportResponse;
import com.b107.interview.domain.report.dto.response.ReportsResponse;
import com.b107.interview.domain.report.entity.Interview;
import com.b107.interview.domain.report.entity.Report;
import com.b107.interview.domain.report.repository.ReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ReportService {

    private static final String NOT_FOUND_REPORT = "레포트가 존재하지 않습니다.";

    private final S3Service s3Service;

    private final ReportRepository reportRepository;

    @Transactional
    public Report createReport(ReportRequest reportRequest, Map<String, MultipartFile> files) throws IOException {


        //항목 별로 영상을 s3에 저장한다.
        for (InterviewRequest interviewRequest : reportRequest.getInterviews()) {
            String url = s3Service.uploadFile(files.get(interviewRequest.getKey()));
            interviewRequest.setKey(url);
        }

        List<Interview> interviews = reportRequest.getInterviews()
                .stream()
                .map((interviewRequest) -> Interview.of(interviewRequest.getQuestion(), interviewRequest.getAnswer(), interviewRequest.getKey()))
                .collect(Collectors.toList());

        Report report = Report.of(
                reportRequest.getUserId(),
                interviews,
                reportRequest.getEyeTrackingViolationCount(),
                reportRequest.getCompany()
                );

        return reportRepository.save(report);
    }


    public ReportResponse getReportDetailsById(String id) {
        Report report = reportRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(NOT_FOUND_REPORT));

        return ReportResponse.from(report);
    }


    public List<ReportsResponse> getReportsByUserId(Long userId) {
        //체크 로직
        List<Report> reports = reportRepository.findByUserId(userId);

        if (reports.isEmpty()) {
            throw new RuntimeException(NOT_FOUND_REPORT);
        }

        return reports.stream()
                .map(ReportsResponse::from)
                .collect(Collectors.toList());
    }

    public boolean deleteReport(String id) {
        if (!reportRepository.existsById(id)) {
            throw new RuntimeException(NOT_FOUND_REPORT);
        }

        reportRepository.deleteById(id);

        return true;
    }
}
