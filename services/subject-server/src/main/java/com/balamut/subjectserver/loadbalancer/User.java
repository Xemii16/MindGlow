package com.balamut.subjectserver.loadbalancer;

import org.springframework.security.core.GrantedAuthority;

import java.util.List;

public record User(
        Integer id,
        String firstname,
        String lastname,
        String email,
        String role,
        boolean locked,
        boolean enabled
) {

    public List<? extends GrantedAuthority> getAuthorities() {
        return List.of(() -> role);
    }
}
