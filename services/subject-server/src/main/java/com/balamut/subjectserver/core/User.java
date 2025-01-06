package com.balamut.subjectserver.core;

import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.List;

public interface User {

    Integer getId();

    Collection<? extends GrantedAuthority> getAuthorities();

}
