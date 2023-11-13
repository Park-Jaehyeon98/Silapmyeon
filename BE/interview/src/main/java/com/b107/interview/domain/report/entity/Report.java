package com.b107.interview.domain.report.entity;

import com.b107.interview.util.MongoAuditable;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter @Builder
@Document(collection = "reports")
public class Report extends MongoAuditable {

    @Id
    private String id;
    private Long userId;
    private String company;
    private List<Interview> interviews;

    public static Report of(Long userId, List<Interview> interviews, String company) {
        return Report.builder()
                .userId(userId)
                .company(company)
                .interviews(interviews)
                .build();
    }
}
