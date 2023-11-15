package com.b107.interview.domain.user.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL) // DTO 를 JSON으로 변환 시 null값인 field 제외
public class TokenResponseStatus {
    Integer status;
    String token;

    public static TokenResponseStatus addStatus(Integer status, String token) {
        return new TokenResponseStatus(status, token);
    }
}
