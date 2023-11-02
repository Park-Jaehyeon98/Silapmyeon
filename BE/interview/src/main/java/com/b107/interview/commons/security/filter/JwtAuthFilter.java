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

        filterChain.doFilter(request, response);
    }

    public Authentication getAuthentication(SecurityUserDto user) {
        return new UsernamePasswordAuthenticationToken(user, "",
                List.of(new SimpleGrantedAuthority(user.getRole())));
    }
}
