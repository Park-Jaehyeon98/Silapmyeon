//package com.b107.interview.domain.report.controller;
//
//import com.b107.interview.domain.report.dto.request.ReportRequest;
//import com.b107.interview.domain.report.dto.response.ReportResponse;
//import com.b107.interview.domain.report.entity.Interview;
//import com.b107.interview.domain.report.entity.Report;
//import com.b107.interview.domain.report.service.ReportService;
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.jayway.jsonpath.JsonPath;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.mockito.internal.hamcrest.HamcrestArgumentMatcher;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
//import org.springframework.http.MediaType;
//import org.springframework.test.context.ActiveProfiles;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
//import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
//import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
//
//import javax.swing.text.AttributeSet;
//import java.util.List;
//
//import static org.assertj.core.api.Assertions.*;
//import static org.hamcrest.Matchers.hasSize;
//import static org.mockito.BDDMockito.*;
//import static org.mockito.ArgumentMatchers.any;
//import static org.springframework.mock.http.server.reactive.MockServerHttpRequest.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//import static org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder.*;
//
//@ActiveProfiles("local")
//@MockBean(JpaMetamodelMappingContext.class)
//@WebMvcTest(ReportController.class)
//class ReportControllerTest {
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @Autowired
//    private ObjectMapper objectMapper;
//
//    @MockBean
//    private ReportService reportService;
//
//    @Test
//    @DisplayName("[post] 레포트를 생성한다.")
//    void postReport() throws Exception {
//        // given
//        List<Interview> interviews = List.of(
//                Interview.of("test question1", "test answer1"),
//                Interview.of("test question2", "test answer2"));
//        ReportRequest reportRequest = ReportRequest.of(1L, interviews, 5);
//
//        // when, then
//        mockMvc.perform(MockMvcRequestBuilders.post("/report")
//                        .content(objectMapper.writeValueAsString(reportRequest))
//                        .contentType(MediaType.APPLICATION_JSON)
//                )
//                .andDo(print())
//                .andExpect(status().isOk());
//    }
//
//    @Test
//    @DisplayName("[post] userId가 null이면 예외가 발생한다.")
//    void shouldThrowExceptionWhenUserIdIsNull() {
//        // given
//
//        // when
//
//        // then
//    }
//
//    @Test
//    @DisplayName("[post] 인터뷰가 null이면 예외가 발생한다.")
//    void shouldThrowExceptionWhenInterviewIsNull() {
//        // given
//
//        // when
//
//        // then
//    }
//
//    @Test
//    @DisplayName("[post] 아이트래킹 위반 횟수가 null이면 예외가 발생한다.")
//    void shouldThrowExceptionWhenEyeTrackingCountIsNull() {
//        // given
//
//        // when
//
//        // then
//    }
//
//    @Test
//    @DisplayName("[get] userId를 가진 모든 레포트를 조회한다.")
//    void getAllReportsByUserId() throws Exception {
//        // given
//        List<Interview> interviews1 = List.of(
//                Interview.of("test question1", "test answer1"),
//                Interview.of("test question2", "test answer2"));
//        Report report1 = Report.of(1L, interviews1, 5, "url1");
//        List<Interview> interviews2 = List.of(
//                Interview.of("test question3", "test answer3"),
//                Interview.of("test question4", "test answer4"));
//        Report report2 = Report.of(1L, interviews2, 6, "url2");
//
//        given(reportService.getReportsByUserId(any()))
//                .willReturn(List.of(
//                        ReportResponse.from(report1),
//                        ReportResponse.from(report2)
//                ));
//
//        // when, then
//        mockMvc.perform(MockMvcRequestBuilders.get("/report/list/{user-id}", 1L))
//                .andDo(print())
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$").isArray())
//                .andExpect(jsonPath("$", hasSize(2)))
//                .andExpect(jsonPath("$.[0].userId").value(1))
//                .andExpect(jsonPath("$.[1].userId").value(1))
//                .andExpect(jsonPath("$.[0].interviews[0].question").value("test question1"))
//                .andExpect(jsonPath("$.[0].interviews[0].answer").value("test answer1"));
//    }
//
//    @Test
//    @DisplayName("[get] id를 가진 레포트의 상세정보를 조회한다.")
//    void getReportDetailById() {
//        // given
//
//        // when
//
//        // then
//    }
//
//    @Test
//    @DisplayName("id를 가진 레포트가 존재하지 않아 예외가 발생한다.")
//    void shouldThrowExceptionWhenNotFoundReportForGetting() {
//        // given
//
//        // when
//
//        // then
//    }
//
//    @Test
//    @DisplayName("[delete] id를 가진 레포트를 삭제한다.")
//    void deleteReportById() {
//        // given
//
//        // when
//
//        // then
//    }
//
//    @Test
//    @DisplayName("id를 가진 레포트가 존재하지 않아 삭제하지 못하고 예외가 발생한다.")
//    void shouldThrowExceptionWhenNotFoundReportForDeletion() {
//        // given
//
//        // when
//
//        // then
//    }
//}