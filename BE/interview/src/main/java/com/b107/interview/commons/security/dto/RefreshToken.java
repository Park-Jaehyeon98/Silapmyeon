package com.b107.interview.commons.security.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@AllArgsConstructor
@Entity
@NoArgsConstructor
//@RedisHash(value = "jwtToken", timeToLive = 60 * 60 * 24 * 14)
public class RefreshToken {

    @Id
    private Long id;

    //@Indexed
    private String accessToken;

    private String refreshToken;


    public void updateAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

}
