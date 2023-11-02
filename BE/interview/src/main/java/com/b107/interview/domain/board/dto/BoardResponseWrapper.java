package com.b107.interview.domain.board.dto;

import com.b107.interview.domain.report.dto.response.ReportResponse;
import lombok.Getter;

@Getter
public class BoardResponseWrapper {
    private BoardResponse boardResponse;
    private ReportResponse reportResponse;

    public BoardResponseWrapper(BoardResponse board, ReportResponse report){
        this.boardResponse = board;
        this.reportResponse = report;

    }
}
