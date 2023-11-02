package com.b107.interview.commons.security.filter;

import com.b107.interview.commons.security.dto.SecurityUserDto;
import com.b107.interview.commons.security.dto.Subject;
import com.b107.interview.commons.security.service.JwtUtil;
import com.b107.interview.domain.user.entity.User;
import com.b107.interview.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
@Component
public class JwtAuthFilter extends OncePerRequestFilter {
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // request Header에서 AccessToken을 가져온다.
        String token = request.getHeader("Authorization");
        String requestURI = request.getRequestURI();

        // 토큰 검사 생략(모두 허용 URL의 경우 토큰 검사 통과)
        if (!StringUtils.hasText(token)) {
            doFilter(request, response, filterChain);
            return;
        }

        if ((token.startsWith("Bearer ")) || requestURI.equals("/token/reissue")) {

            if (requestURI.equals("/token/reissue")) {
                if (!jwtUtil.verifyToken(token)) {
                    throw new JwtException("유효하지 않은 Refresh 토큰입니다.");
                }

                Subject rtkSubject = jwtUtil.getSubject(token);

                if (!rtkSubject.getType().equals("RTK")) {
                    throw new JwtException("토큰을 확인하세요.");
                }

                User findUser = userRepository.findByUserId(rtkSubject.getUserId())
                        .orElseThrow(IllegalStateException::new);

                // SecurityContext에 등록할 User 객체를 만들어준다.
                SecurityUserDto userDto = SecurityUserDto.builder()
                        .userId(findUser.getUserId())
                        .email(findUser.getUserEmail())
                        .role("ROLE_".concat(findUser.getRole()))
                        .nickname(findUser.getUserNickname())
                        .build();

                // SecurityContext에 인증 객체를 등록해준다.
                Authentication auth = getAuthentication(userDto);
                SecurityContextHolder.getContext().setAuthentication(auth);
            } else {
                String atk = token.substring(7);

                if (!jwtUtil.verifyToken(atk) || jwtUtil.isBlackList(atk)) {
                    throw new JwtException("유효하지 않은 AccessToken 입니다.");
                }

                Subject atkSubject = jwtUtil.getSubject(atk);

                User findUser = userRepository.findByUserId(atkSubject.getUserId())
                        .orElseThrow(IllegalStateException::new);

                // SecurityContext에 등록할 User 객체를 만들어준다.
                SecurityUserDto userDto = SecurityUserDto.builder()
                        .userId(findUser.getUserId())
                        .email(findUser.getUserEmail())
                        .role("ROLE_".concat(findUser.getRole()))
                        .nickname(findUser.getUserNickname())
                        .build();

                // SecurityContext에 인증 객체를 등록해준다.
                Authentication auth = getAuthentication(userDto);
                SecurityContextHolder.getContext().setAuthentication(auth);
            }


        } else {
            throw new JwtException("유효하지 않은 토큰입니다.");
        }

        ///////////////////////////////////


//        if (!jwtUtil.verifyToken(token)) {
//            throw new JwtException("Token 만료!");
//        }
//
//        Subject subject = jwtUtil.getSubject(token);
//        String requestURI = request.getRequestURI();
//        if (subject.getType().equals("RTK") && !requestURI.equals("/token/reissue")) {
//            throw new JwtException("토큰을 확인하세요.");
//        }


//        Optional<RefreshToken> refreshToken = refreshTokenRepository.findByAccessToken(accessToken);
//        if (refreshToken.isEmpty()) {
//            throw new JwtException("유효하지 않은 Access Token");
//        }
//        // AccessToken을 검증하고, 만료되었을경우 예외를 발생시킨다.
//        if (!jwtUtil.verifyToken(accessToken)) {
//            throw new JwtException("Access Token 만료!");
//        }


        // AccessToken 내부의 payload에 있는 userId로 user를 조회한다. 없다면 예외를 발생시킨다 -> 정상 케이스가 아님
//        System.out.println("jwtUtil.getUid(atc):" + jwtUtil.getSubject(token).getUserId());
//        User findUser = userRepository.findByUserId(jwtUtil.getSubject(token).getUserId())
//                .orElseThrow(IllegalStateException::new);
//
//        // SecurityContext에 등록할 User 객체를 만들어준다.
//        SecurityUserDto userDto = SecurityUserDto.builder()
//                .userId(findUser.getUserId())
//                .email(findUser.getUserEmail())
//                .role("ROLE_".concat(findUser.getRole()))
//                .nickname(findUser.getUserNickname())
//                .build();
//
//        // SecurityContext에 인증 객체를 등록해준다.
//        Authentication auth = getAuthentication(userDto);
//        SecurityContextHolder.getContext().setAuthentication(auth);


        filterChain.doFilter(request, response);
    }

    public Authentication getAuthentication(SecurityUserDto user) {
        return new UsernamePasswordAuthenticationToken(user, "",
                List.of(new SimpleGrantedAuthority(user.getRole())));
    }
}
