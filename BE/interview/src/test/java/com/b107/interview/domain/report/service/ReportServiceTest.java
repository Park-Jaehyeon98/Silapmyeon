package com.b107.interview.domain.report.service;

import com.b107.interview.domain.report.dto.request.ReportRequest;
import com.b107.interview.domain.report.dto.response.ReportResponse;
import com.b107.interview.domain.report.entity.Interview;
import com.b107.interview.domain.report.entity.Report;
import com.b107.interview.domain.report.repository.ReportRepository;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.BDDMockito.*;

@ActiveProfiles("test")
@ExtendWith(MockitoExtension.class)
class ReportServiceTest {

    @InjectMocks
    private ReportService reportService;

    @Mock
    private ReportRepository reportRepository;

    @Test
    @DisplayName("리포트를 저장한다.")
    void createReport() {
        // given
        List<Interview> interviews = List.of(Interview.of("test question1", "test answer1"),
                Interview.of("test question2", "test answer2"));
        ReportRequest reportRequest = ReportRequest.of(1L, interviews, 5);
        Report report = Report.of(
                reportRequest.getUserId(),
                reportRequest.getInterviews(),
                reportRequest.getEyeTrackingViolationCount(),
                "url"
        );

        given(reportRepository.save(any())).willReturn(report);

        // when
        Report result = reportService.createReport(reportRequest, "url");

        // then

        assertThat(result.getUserId()).isEqualTo(1);
        assertThat(result.getInterviews()).extracting("question", "answer")
                        .containsExactlyInAnyOrder(
                                tuple("test question1", "test answer1"),
                                tuple("test question2", "test answer2")
                        );
        assertThat(result.getEyeTrackingViolationCount()).isEqualTo(5);
        assertThat(result.getScenarioUrl()).isEqualTo("url");
    }

    @Test
    @DisplayName("해당 id값을 가진 레포트를 조회한다.")
    void getReportDetailsById() {
        // given
        List<Interview> interviews = List.of(Interview.of("test question1", "test answer1"),
                Interview.of("test question2", "test answer2"));

        Report report = Report.of(1L, interviews, 5, "url");

        given(reportRepository.findById(any())).willReturn(Optional.of(report));

        // when
        ReportResponse reportDetailsById = reportService.getReportDetailsById("df");

        // then
        assertThat(reportDetailsById.getInterviews()).extracting("question", "answer")
                .containsExactlyInAnyOrder(
                        tuple("test question1", "test answer1"),
                        tuple("test question2", "test answer2")
                );
        assertThat(reportDetailsById.getEyeTrackingViolationCount()).isEqualTo(5);
        assertThat(reportDetailsById.getScenarioUrl()).isEqualTo("url");
    }

    @Test
    @DisplayName("해당 userId를 가진 레포트를 모두 조회한다.")
    void getAllReportsByUserId() {
        // given
        List<Interview> interviews1 = List.of(Interview.of("test question1", "test answer1"),
                Interview.of("test question2", "test answer2"));
        Report report1 = Report.of(1L, interviews1, 5, "url");

        List<Interview> interviews2 = List.of(Interview.of("test question3", "test answer3"),
                Interview.of("test question4", "test answer4"));
        Report report2 = Report.of(1L, interviews2, 6, "url");

        given(reportRepository.findByUserId(any())).willReturn(List.of(report1, report2));

        // when
        List<ReportResponse> reportResponsesByUserId = reportService.getReportsByUserId(1L);

        // then
        assertThat(reportResponsesByUserId).hasSize(2);
        assertThat(reportResponsesByUserId.get(0).getInterviews()).extracting("question", "answer")
                .containsExactlyInAnyOrder(
                        tuple("test question1", "test answer1"),
                        tuple("test question2", "test answer2")
        );
        assertThat(reportResponsesByUserId.get(1).getInterviews()).extracting("question", "answer")
                .containsExactlyInAnyOrder(
                        tuple("test question3", "test answer3"),
                        tuple("test question4", "test answer4")
                );
        assertThat(reportResponsesByUserId.get(0).getUserId()).isEqualTo(1L);
        assertThat(reportResponsesByUserId.get(1).getUserId()).isEqualTo(1L);
        assertThat(reportResponsesByUserId.get(0).getEyeTrackingViolationCount()).isEqualTo(5);
        assertThat(reportResponsesByUserId.get(1).getEyeTrackingViolationCount()).isEqualTo(6);
    }

    @Test
    @DisplayName("해당 userId를 가진 레포트가 존재하지 않아 예외가 발생한다.")
    void getAllReportsByUserIdWithException() {
        // given
        given(reportRepository.findByUserId(any())).willReturn(List.of());

        //when, then
        assertThatThrownBy(() -> reportService.getReportsByUserId(2L))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("레포트가 존재하지 않습니다.");
    }

    @Test
    @DisplayName("id를 가진 레포트가 삭제된다.")
    void deleteReportWithValidId() {
        // given
        given(reportRepository.existsById(any())).willReturn(true);

        // when
        boolean result = reportService.deleteReport("test");

        // then
        assertThat(result).isTrue();
    }

    @Test
    @DisplayName("id를 가진 레포트가 없어 예외가 발생한다.")
    void shouldThrowExceptionWhenReportWithGivenIdNotFound() {
        // given
        given(reportRepository.existsById(any())).willReturn(false);

        // when, then
        assertThatThrownBy(() -> reportService.deleteReport("test"))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("레포트가 존재하지 않습니다.");
    }
}