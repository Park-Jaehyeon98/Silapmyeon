package com.b107.interview.domain.report.entity;

import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Getter
@Document(collation = "reports")
public class Report {

    @Id
    private String id;
    private List<Interview> Interviews = new ArrayList<>();
    private int eyeTrackingViolationCount;

}
