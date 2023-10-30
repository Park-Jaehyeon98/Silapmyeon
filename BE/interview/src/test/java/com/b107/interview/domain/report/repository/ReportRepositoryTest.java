package com.b107.interview.domain.report.repository;

import com.b107.interview.domain.report.entity.Interview;
import com.b107.interview.domain.report.entity.Report;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;

import java.util.List;

import static org.assertj.core.api.Assertions.*;

@MockBean(JpaMetamodelMappingContext.class)
@DataMongoTest
class ReportRepositoryTest {

    @Autowired
    private ReportRepository reportRepository;

    @BeforeEach
    public void teardown() {
        reportRepository.deleteAll();
    }

    @Test
    @DisplayName("해당 userId를 가진 레포트가 존재한다.")
    void existsReportByUserId() {
        // given
        List<Interview> interviews = List.of(Interview.of("test question1", "test answer1"),
                Interview.of("test question2", "test answer2"));
        Report report = Report.of(1L, interviews, 5, "url");

        reportRepository.save(report);

        // when
        boolean result = reportRepository.existsUserByUserId(1L);

        // then
        assertThat(result).isTrue();
    }

    @Test
    @DisplayName("userId를 가진 레포트가 존재하지 않는다.")
    void notExistsReportByUserId() {
        // given
        List<Interview> interviews = List.of(Interview.of("test question1", "test answer1"),
                Interview.of("test question2", "test answer2"));
        Report report = Report.of(1L, interviews, 5, "url");

        reportRepository.save(report);

        // when
        boolean result = reportRepository.existsUserByUserId(2L);

        // then
        assertThat(result).isFalse();
    }

    @Test
    @DisplayName("userId를 가진 레포트가 여러 개 존재한다.")
    void existsReportsByUserId() {
        // given
        List<Interview> interviews1 = List.of(
                Interview.of("test question1", "test answer1"),
                Interview.of("test question2", "test answer2"));
        Report report1 = Report.of(1L, interviews1, 5, "url");
        List<Interview> interviews2 = List.of(
                Interview.of("test question3", "test answer3"),
                Interview.of("test question4", "test answer4"));
        Report report2 = Report.of(1L, interviews2, 6, "url");
        List<Interview> interviews3 = List.of(
                Interview.of("test question5", "test answer5"),
                Interview.of("test question6", "test answer6"));
        Report report3 = Report.of(1L, interviews3, 7, "url");

        reportRepository.saveAll(List.of(report1, report2, report3));

        // when
        List<Report> reports = reportRepository.findByUserId(1L);

        // then
        assertThat(reports).hasSize(3);
        assertThat(reports.get(0).getUserId()).isEqualTo(1L);
        assertThat(reports.get(0).getInterviews()).extracting("question", "answer")
                .containsExactlyInAnyOrder(
                        tuple("test question1", "test answer1"),
                        tuple("test question2", "test answer2")
                );
        assertThat(reports.get(0).getEyeTrackingViolationCount()).isEqualTo(5);
        assertThat(reports.get(0).getScenarioUrl()).isEqualTo("url");
    }

    @Test
    @DisplayName("userId를 가진 레포트가 없어 Null이 반환된다.")
    void notExistsReportsByUserId() {
        // given
        List<Interview> interviews1 = List.of(
                Interview.of("test question1", "test answer1"),
                Interview.of("test question2", "test answer2"));
        Report report1 = Report.of(1L, interviews1, 5, "url");
        List<Interview> interviews2 = List.of(
                Interview.of("test question3", "test answer3"),
                Interview.of("test question2", "test answer2"));
        Report report2 = Report.of(1L, interviews2, 5, "url");
        List<Interview> interviews3 = List.of(
                Interview.of("test question1", "test answer1"),
                Interview.of("test question2", "test answer2"));
        Report report3 = Report.of(1L, interviews3, 5, "url");

        reportRepository.saveAll(List.of(report1, report2, report3));

        // when
        List<Report> reports = reportRepository.findByUserId(2L);

        // then
        assertThat(reports).hasSize(0);
    }
}