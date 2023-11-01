package com.b107.interview.domain.user.service;

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

    public Optional<User> findUser(String email, String provider) {
        Optional<User> optionalUser = userRepository.findByUserEmailAndProvider(email, provider);
        return optionalUser;
    }

    public User createUser(User user) {
        User createdUser = userRepository.save(user);
        return createdUser;
    }
}
