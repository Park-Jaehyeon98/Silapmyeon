package com.b107.interview.domain.report.controller;

import com.b107.interview.domain.report.dto.request.ReportRequest;
import com.b107.interview.domain.report.dto.response.ReportResponse;
import com.b107.interview.domain.report.dto.response.ReportsResponse;
import com.b107.interview.domain.report.service.ReportService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@Slf4j
@Controller
@RequestMapping("/report")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @PostMapping
    public ResponseEntity<Object> postReport(
            @Valid @RequestPart("json") ReportRequest reportRequest,
            @RequestParam Map<String, MultipartFile> files
    ) throws IOException {

        log.info("[post] 레포트 생성");
        ReportResponse response = reportService.createReport(reportRequest, files);
        return ResponseEntity.ok()
                .body(response);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<Object> getReportDetails(@PathVariable String id) {
        log.info("[get] 레포트 상세 조회");
        return ResponseEntity.ok()
                .body(reportService.getReportDetailsById(id));
    }

    @PostMapping("/list")
    public ResponseEntity<Object> getReportsByUserId(HttpServletRequest request) {
        Long userId = Long.parseLong(request.getHeader("userId"));
        log.info("[get] " + userId + " 레포트 목록 조회");
        List<ReportsResponse> reports = reportService.getReportsByUserId(userId);
        return ResponseEntity.ok()
                .body(reports);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteReportById(@PathVariable String id) {
        log.info("[delete] 레포트 삭제");
        reportService.deleteReport(id);
        return ResponseEntity.ok()
                .build();
    }

}
