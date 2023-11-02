package com.b107.interview.commons.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "spring.jwt")
public class JwtProperties {
    public static final String HEADER_STRING = "Authorization";
    private String secret;
    private Long atkLive;
    private Long rtkLive;
}
