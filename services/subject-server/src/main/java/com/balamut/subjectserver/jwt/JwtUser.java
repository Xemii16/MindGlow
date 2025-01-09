package com.balamut.subjectserver.jwt;

import com.balamut.subjectserver.core.User;
import org.springframework.lang.NonNull;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.List;

public class JwtUser implements User {

    private final Integer id;
    private final Collection<? extends GrantedAuthority> authorities;
    private final boolean locked;
    private final boolean enabled;

    public JwtUser(@NonNull Integer id, Collection<? extends GrantedAuthority> authorities, boolean locked, boolean enabled) {
        this.id = id;
        this.authorities = authorities;
        this.locked = locked;
        this.enabled = enabled;
    }

    @Override
    public Integer getId() {
        return this.id;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    @Override
    public boolean isLocked() {
        return this.locked;
    }

    @Override
    public boolean isEnabled() {
        return this.enabled;
    }
}
