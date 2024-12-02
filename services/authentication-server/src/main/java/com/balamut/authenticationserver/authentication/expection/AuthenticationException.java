package com.balamut.authenticationserver.authentication.expection;

public class AuthenticationException extends RuntimeException {
    public AuthenticationException(String reason) {
        super("Authentication failed: " + reason);
    }
}
