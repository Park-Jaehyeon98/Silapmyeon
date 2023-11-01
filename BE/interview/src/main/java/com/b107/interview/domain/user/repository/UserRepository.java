package com.b107.interview.domain.user.repository;


import com.b107.interview.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByUserId(Long userId);

    Optional<User> findByUserEmailAndProvider(String userEmail, String provider);


}
