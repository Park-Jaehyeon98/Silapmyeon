package com.b107.interview.commons.security.service;

import com.b107.interview.commons.properties.JwtProperties;
import com.b107.interview.commons.security.dao.RedisDao;
import com.b107.interview.commons.security.dto.GeneratedToken;
import com.b107.interview.commons.security.dto.SecurityUserDto;
import com.b107.interview.commons.security.dto.Subject;
import com.b107.interview.domain.user.entity.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.PostConstruct;
import java.time.Duration;
import java.util.Base64;
import java.util.Calendar;
import java.util.Date;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class JwtUtil {
    private final JwtProperties jwtProperties;
    private String secretKey;
    private final ObjectMapper objectMapper;
    private final RedisDao redisDao;

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(jwtProperties.getSecret().getBytes());
    }


    public GeneratedToken generateToken(Long userId, String userEmail, String role) throws JsonProcessingException {

        Subject atkSubject = Subject.atk(userId, userEmail, role);
        Subject rtkSubject = Subject.rtk(userId, userEmail, role);

        // refreshToken과 accessToken을 생성한다.
        String accessToken = createToken(atkSubject, jwtProperties.getAtkLive());
        String refreshToken = createToken(rtkSubject, jwtProperties.getRtkLive());


        // 토큰을 Redis에 저장
        redisDao.setValues("RTK" + userId, refreshToken, Duration.ofMillis(jwtProperties.getRtkLive()));
        return new GeneratedToken(accessToken, refreshToken);
    }

    public GeneratedToken reissueAtk(SecurityUserDto user) throws Exception {
        String rtkInRedis = redisDao.getValues("RTK" + user.getUserId());

        if (Objects.isNull(rtkInRedis)) throw new Exception("인증 정보가 만료되었습니다.");

        Subject atkSubject = Subject.atk(
                user.getUserId(),
                user.getEmail(),
                user.getRole()
        );

        String atk = createToken(atkSubject, jwtProperties.getAtkLive());
        return new GeneratedToken(atk, null);
    }

    public String createToken(Subject subject, Long tokenLive) throws JsonProcessingException {
        String subjectStr = objectMapper.writeValueAsString(subject);

        Claims claims = Jwts.claims()
                .setSubject(subjectStr);
        Date now = new Date();
        return
                Jwts.builder()
                        // Payload를 구성하는 속성들을 정의한다.
                        .setClaims(claims)
                        // 발행일자를 넣는다.
                        .setIssuedAt(now)
                        // 토큰의 만료일시를 설정한다.
                        .setExpiration(new Date(now.getTime() + tokenLive))
                        // 지정된 서명 알고리즘과 비밀 키를 사용하여 토큰을 서명한다.
                        .signWith(SignatureAlgorithm.HS256, secretKey)
                        .compact();
    }

    public boolean verifyToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parser()
                    .setSigningKey(secretKey) // 비밀키를 설정하여 파싱한다.
                    .parseClaimsJws(token);  // 주어진 토큰을 파싱하여 Claims 객체를 얻는다.
            // 토큰의 만료 시간과 현재 시간비교
            return claims.getBody()
                    .getExpiration()
                    .after(new Date());  // 만료 시간이 현재 시간 이후인지 확인하여 유효성 검사 결과를 반환
        } catch (Exception e) {
            return false;
        }
    }

    public Subject getSubject(String atk) throws JsonProcessingException {
        String subjectStr = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(atk).getBody().getSubject();
        return objectMapper.readValue(subjectStr, Subject.class);
    }

    public void deleteRefreshToken(User user) {
        redisDao.deleteValues("RTK" + user.getUserId());
    }

    public void setBlackListAccessToken(String bearerAtk) {
        String acToken = bearerAtk.substring(7);
        Jws<Claims> claims = Jwts.parser()
                .setSigningKey(secretKey) // 비밀키를 설정하여 파싱한다.
                .parseClaimsJws(acToken);
        long expiration = claims.getBody().getExpiration().getTime();
        long now = Calendar.getInstance().getTime().getTime();

        redisDao.setValues(acToken, "logout", Duration.ofMillis(expiration - now));
    }

    public boolean isBlackList(String atk) {
        return StringUtils.hasText(redisDao.getValues(atk));
    }

}
