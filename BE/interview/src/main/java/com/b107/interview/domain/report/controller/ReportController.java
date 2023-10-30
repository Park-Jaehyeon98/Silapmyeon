package com.b107.interview.domain.report.controller;

import com.b107.interview.domain.report.dto.request.ReportRequest;
import com.b107.interview.domain.report.dto.response.ReportResponse;
import com.b107.interview.domain.report.service.ReportService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@Controller
@RequestMapping("/report")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @PostMapping
    public ResponseEntity<Object> postReport(@Valid @RequestBody ReportRequest reportRequest) {
        reportService.createReport(reportRequest, "임시Url");
        return ResponseEntity.ok().build();
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<Object> getReportDetails(@PathVariable String id) {
        return ResponseEntity.ok()
                .body(reportService.getReportDetailsById(id));
    }

    @GetMapping("/list/{user-id}")
    public ResponseEntity<Object> getReportsByUserId(@PathVariable Long userId) {
        List<ReportResponse> reports = reportService.getReportsByUserId(userId);
        return ResponseEntity.ok()
                .body(reports);
    }

    @DeleteMapping("/id")
    public ResponseEntity<Object> deleteReportById(@PathVariable String id) {
        reportService.deleteReport(id);
        return ResponseEntity.ok()
                .build();
    }

}
