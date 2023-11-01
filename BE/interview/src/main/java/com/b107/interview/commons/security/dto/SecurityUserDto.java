package com.b107.interview.commons.security.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class SecurityUserDto {
    private Long userId;
    private String email;
    private String role;
    private String nickname;

}
