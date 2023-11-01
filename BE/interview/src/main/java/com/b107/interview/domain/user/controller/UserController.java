package com.b107.interview.domain.user.controller;

import com.b107.interview.domain.user.dto.response.UserResDto;
import com.b107.interview.domain.user.entity.User;
import com.b107.interview.domain.user.mapper.UserMapper;
import com.b107.interview.domain.user.service.UserService;
import com.b107.interview.util.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserMapper userMapper;

    @GetMapping("/loginSuccess")
    public String loginSuccess(@RequestParam String accessToken) {
        System.out.println("로그인 성공 : " + accessToken);

        return "로그인 성공 : " + accessToken;
    }

    @GetMapping
    public ResponseEntity<?> getUser() {
        User foundUser = userService.readUser(SecurityUtils.getUser());
        UserResDto userResDto = userMapper.userToUserResDto(foundUser);
        return new ResponseEntity<>(userResDto, HttpStatus.OK);
    }

}
