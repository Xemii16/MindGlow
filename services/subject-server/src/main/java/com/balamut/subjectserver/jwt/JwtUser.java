package com.balamut.subjectserver.jwt;

import com.balamut.subjectserver.core.User;
import org.springframework.lang.NonNull;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.List;

public class JwtUser implements User {

    private final Integer id;

    public JwtUser(@NonNull Integer id) {
        this.id = id;
    }

    @Override
    public Integer getId() {
        return this.id;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // not implemented
        return List.of();
    }
}
