package com.b107.interview.domain.user.service;

import com.b107.interview.commons.security.dto.SecurityUserDto;
import com.b107.interview.domain.user.entity.User;
import com.b107.interview.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
}
