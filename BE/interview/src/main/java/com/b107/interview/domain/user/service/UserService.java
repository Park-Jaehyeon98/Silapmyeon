package com.b107.interview.domain.user.service;

import com.b107.interview.commons.security.dto.SecurityUserDto;
import com.b107.interview.domain.user.entity.User;
import com.b107.interview.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    // OAuth 로그인 시 email과 provider로 유저 조회
    public Optional<User> findUser(String email, String provider) {
        Optional<User> optionalUser = userRepository.findByUserEmailAndProvider(email, provider);
        return optionalUser;
    }

    public User createUser(User user) {
        User createdUser = userRepository.save(user);
        return createdUser;
    }

    public User readUser(SecurityUserDto user) {
        Optional<User> optionalUser = userRepository.findByUserId(user.getUserId());
        if (optionalUser.isEmpty()) {
            throw new RuntimeException("존재하지 않는 회원입니다.");
        }
        return optionalUser.get();
    }

    public User updateUser(User modifyUser, SecurityUserDto user) {
        Optional<User> optionalUser = userRepository.findByUserId(user.getUserId());
        if (optionalUser.isEmpty()) {
            throw new RuntimeException("존재하지 않는 회원입니다.");
        }
        User findUser = optionalUser.get();

        // 닉네임 수정
        if (StringUtils.hasText(modifyUser.getUserNickname()) && !modifyUser.getUserNickname().equals(findUser.getUserNickname())) {
            findUser.setUserNickname(modifyUser.getUserNickname());
        }

        // todo 프로필 이미지 수정

        return findUser;
    }
}
