package com.b107.interview.domain.report.controller;

import com.b107.interview.domain.report.dto.request.ReportRequest;
import com.b107.interview.domain.report.dto.response.ReportResponse;
import com.b107.interview.domain.report.service.ReportService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
            @RequestPart Map<String, MultipartFile> files
    ) throws IOException {

        log.info("[post] 레포트 생성");
        reportService.createReport(reportRequest, files);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<Object> getReportDetails(@PathVariable String id) {
        log.info("[get] 레포트 상세 조회");
        return ResponseEntity.ok()
                .body(reportService.getReportDetailsById(id));
    }

    @GetMapping("/list/{userId}")
    public ResponseEntity<Object> getReportsByUserId(@PathVariable Long userId) {
        log.info("[get] " + userId + " 레포트 목록 조회");
        List<ReportResponse> reports = reportService.getReportsByUserId(userId);
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
