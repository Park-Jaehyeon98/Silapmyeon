package com.b107.interview.commons.security.config.handler;

import com.b107.interview.commons.properties.UrlProperties;
import com.b107.interview.commons.security.dto.GeneratedToken;
import com.b107.interview.commons.security.service.JwtUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Component
@RequiredArgsConstructor
public class MyAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtUtil jwtUtil;
    private final UrlProperties uriProperties;
    private final ObjectMapper objectMapper;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        // OAuth2User로 캐스팅하여 인증된 사용자 정보를 가져온다.
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        // 사용자 이메일을 가져온다.
        String email = oAuth2User.getAttribute("email");
        // 서비스 제공 플랫폼(GOOGLE, KAKAO, NAVER)이 어디인지 가져온다.
        String provider = oAuth2User.getAttribute("provider");


        // CustomOAuth2UserService에서 셋팅한 로그인한 회원 존재 여부를 가져온다.
        boolean isExist = oAuth2User.getAttribute("exist");

        // JWT에 넣을 userId (CustomOAuth2UserService에서 세팅)
        Long userId = oAuth2User.getAttribute("userId");
        String userEmail = oAuth2User.getAttribute("userEmail");

        System.out.println(email + "// " + provider + "//" + isExist + "// userId: " + userId);
        // OAuth2User로 부터 Role을 얻어온다.
        String role = oAuth2User.getAuthorities().stream().
                findFirst() // 첫번째 Role을 찾아온다.
                .orElseThrow(IllegalAccessError::new) // 존재하지 않을 시 예외를 던진다.
                .getAuthority(); // Role을 가져온다.


        // 회원이 존재하면 jwt token 발행을 시작한다.
        GeneratedToken token = jwtUtil.generateToken(userId, userEmail, role);

        System.out.println("accesstoken: " + token.getAccessToken());
        // accessToken을 쿼리스트링에 담는 url을 만들어준다.
        String targetUrl = UriComponentsBuilder.fromUriString(uriProperties.getFrontend() + "/loginSuccess")
                .queryParam("accessToken", token.getAccessToken())
                .queryParam("refreshToken", token.getRefreshToken())
                .build()
                .encode(StandardCharsets.UTF_8)
                .toUriString();

        // 로그인 확인 페이지로 리다이렉트 시킨다.
        System.out.println("redirect ---------------> " + targetUrl);
//        writeTokenResponse(response, token);
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    private void writeTokenResponse(HttpServletResponse response, GeneratedToken token)
            throws IOException {
        response.setContentType("text/html;charset=UTF-8");

        response.addHeader("Authorization", token.getAccessToken());
        response.addHeader("Refresh", token.getRefreshToken());
        response.setContentType("application/json;charset=UTF-8");

        var writer = response.getWriter();
        writer.println(objectMapper.writeValueAsString(token));
        writer.flush();
    }
}
