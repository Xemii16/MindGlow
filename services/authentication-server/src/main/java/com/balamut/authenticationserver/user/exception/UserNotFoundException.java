package com.balamut.authenticationserver.user.exception;

public class UserNotFoundException extends UserException {
    public UserNotFoundException(String email) {
        super("user with email " + email + " does not exist");
    }
}
