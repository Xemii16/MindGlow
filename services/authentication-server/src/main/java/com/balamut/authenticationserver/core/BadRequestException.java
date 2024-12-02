package com.balamut.authenticationserver.core;

public class BadRequestException extends RuntimeException {
    public BadRequestException(String reason) {
        super("Bad request: " + reason);
    }
}
