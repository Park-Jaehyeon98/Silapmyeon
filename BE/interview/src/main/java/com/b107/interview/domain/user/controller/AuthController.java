package com.b107.interview.domain.user.controller;

import com.b107.interview.commons.security.service.JwtUtil;
import com.b107.interview.commons.support.StatusResponseDto;
import com.b107.interview.domain.user.entity.User;
import com.b107.interview.domain.user.service.UserService;
import com.b107.interview.util.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthController {
    private final JwtUtil jwtUtil;
    private final UserService userService;

    @PostMapping("/token/logout")
    public ResponseEntity<StatusResponseDto> logout(@RequestHeader("Authorization") String bearerAtk) {

        User user = userService.readUser(SecurityUtils.getUser());

        jwtUtil.setBlackListAccessToken(bearerAtk);
        jwtUtil.deleteRefreshToken(user);
        return ResponseEntity.ok(StatusResponseDto.addStatus(200));
    }


    @PostMapping("/token/reissue")
    public ResponseEntity<?> reissue() throws Exception {
        return new ResponseEntity<>(jwtUtil.reissueAtk(SecurityUtils.getUser()), HttpStatus.OK);
    }
}
