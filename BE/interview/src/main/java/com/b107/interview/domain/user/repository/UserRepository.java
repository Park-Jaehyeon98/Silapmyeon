package com.b107.interview.domain.user.repository;

import com.b107.interview.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
}
