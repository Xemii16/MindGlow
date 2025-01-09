package com.balamut.authenticationserver.user.request;

public record UserRequest(
        String firstname,
        String lastname,
        boolean locked,
        boolean enabled
) {
}
