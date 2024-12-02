package com.balamut.authenticationserver.user.exception;

public class UserNotExistsException extends UserException {
    public UserNotExistsException(String email) {
        super("user with email " + email + " does not exist");
    }
}
