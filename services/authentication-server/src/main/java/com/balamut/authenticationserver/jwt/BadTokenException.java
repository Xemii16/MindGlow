package com.balamut.authenticationserver.jwt;

import org.springframework.security.core.AuthenticationException;

public class BadTokenException extends AuthenticationException {

    public BadTokenException(String msg) {
        super(msg);
    }
}
