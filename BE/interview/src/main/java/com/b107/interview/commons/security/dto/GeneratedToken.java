package com.b107.interview.commons.security.dto;

import lombok.Getter;

@Getter
public class GeneratedToken {
    private String refreshToken;
    private String accessToken;

    public GeneratedToken(String accessToken, String refreshToken) {
        this.accessToken = "Bearer " + accessToken;
        this.refreshToken = refreshToken;
    }
}
