package com.balamut.authenticationserver.authentication.expection;

public class BadCredentialsException extends AuthenticationException {
    public BadCredentialsException() {
        super("bad credentials");
    }
}
