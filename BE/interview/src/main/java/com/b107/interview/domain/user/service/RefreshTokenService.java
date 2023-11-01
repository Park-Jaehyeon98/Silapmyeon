package com.b107.interview.domain.user.service;

import com.b107.interview.commons.security.dto.RefreshToken;
import com.b107.interview.domain.user.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;

    @Transactional
    public void saveTokenInfo(Long userId, String refreshToken, String accessToken) {
        refreshTokenRepository.save(new RefreshToken(userId, accessToken, refreshToken));
    }

    @Transactional
    public void removeRefreshToken(String accessToken) {
        RefreshToken token = refreshTokenRepository.findByAccessToken(accessToken)
                .orElseThrow(IllegalArgumentException::new);

        refreshTokenRepository.delete(token);
    }
}
