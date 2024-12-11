package com.balamut.authenticationserver.user.request;

public record RegisterRequest(
        String firstname,
        String lastname,
        String email,
        String password
) {
}
