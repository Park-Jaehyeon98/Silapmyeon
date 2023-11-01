package com.b107.interview.domain.user.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    @GetMapping("/loginSuccess")
    public String loginSuccess(@RequestParam String accessToken) {
        System.out.println("로그인 성공 : " + accessToken);

        return "로그인 성공 : " + accessToken;
    }

    @GetMapping("/test")
    public String test() {
        return "test";
    }

}
