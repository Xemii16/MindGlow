package com.balamut.subjectserver.core;

import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public interface User {

    Integer getId();

    Collection<? extends GrantedAuthority> getAuthorities();

    boolean isLocked();

    boolean isEnabled();

}
