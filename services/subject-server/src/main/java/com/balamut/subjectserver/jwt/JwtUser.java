package com.balamut.subjectserver.jwt;

import com.balamut.subjectserver.core.User;
import org.springframework.lang.NonNull;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.List;

public class JwtUser implements User {

    private final Integer id;
    private final Collection<? extends GrantedAuthority> authorities;

    public JwtUser(@NonNull Integer id, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.authorities = authorities;
    }

    @Override
    public Integer getId() {
        return this.id;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }
}
