package com.b107.interview.commons.security.config;

import com.b107.interview.commons.security.config.handler.MyAuthenticationFailureHandler;
import com.b107.interview.commons.security.config.handler.MyAuthenticationSuccessHandler;
import com.b107.interview.commons.security.filter.JwtAuthFilter;
import com.b107.interview.commons.security.filter.JwtExceptionFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final MyAuthenticationSuccessHandler oAuth2LoginSuccessHandler;
    private final CustomOAuth2UserService customOAuth2UserService;
    private final JwtAuthFilter jwtAuthFilter;
    private final MyAuthenticationFailureHandler oAuth2LoginFailureHandler;
    private final JwtExceptionFilter jwtExceptionFilter;


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .httpBasic().disable() // HTTP 기본 인증을 비활성화
                .cors().and() // CORS  활성화
                .csrf().disable() // CSRF 보호 기능 비활성화
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 세션관리 정책은 STATELESS (세션이 있으면 쓰지 않고, 없으면 만들지 않음)
                .and()
                .authorizeRequests() // 요청에 대한 인증 설정
                .antMatchers("/token/**", "/loginSuccess").permitAll() // 토큰 발급을 위한 경로는 모두 허용
                .anyRequest().authenticated() // 그 외의 모든 요청은 인증이 필요
                .and()
                .oauth2Login() // OAuth2 로그인 설정 시작
                .userInfoEndpoint().userService(customOAuth2UserService) // OAuth2 로그인 시 사용자 정보를 가져오는 엔드 포인트
                .and()
                .failureHandler(oAuth2LoginFailureHandler) // OAuth2 로그인 실패시 처리한 핸들러를 지정
                .successHandler(oAuth2LoginSuccessHandler);

        return http.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(jwtExceptionFilter, JwtAuthFilter.class)
                .build();
    }

    @Bean
// CORS 설정
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOriginPattern("*");
        configuration.addAllowedMethod("*"); // 모든 HTTP 메서드 허용
        configuration.addAllowedHeader("*"); // 모든 헤더 허용
        configuration.setAllowCredentials(true); // 자격 증명 허용 설정

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // 모든 경로에 대해 CORS 구성 적용
        return source;
    }
}
