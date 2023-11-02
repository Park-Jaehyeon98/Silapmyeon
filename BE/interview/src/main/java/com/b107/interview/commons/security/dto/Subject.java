package com.b107.interview.commons.security.dto;

import lombok.Getter;

@Getter
public class Subject {
    private final Long userId;
    private final String userEmail;
    private final String role;
    private final String type;

    private Subject(Long userId, String userEmail, String role, String type) {
        this.userId = userId;
        this.userEmail = userEmail;
        this.role = role;
        this.type = type;
    }

    public static Subject atk(Long userId, String userEmail, String role) {
        return new Subject(userId, userEmail, role, "ATK");
    }

    public static Subject rtk(Long userId, String userEmail, String role) {
        return new Subject(userId, userEmail, role, "RTK");
    }
}
