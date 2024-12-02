package com.balamut.authenticationserver.user.response;

public record UserResponse(
        Integer id,
        String firstname,
        String lastname,
        String email,
        String role,
        boolean locked,
        boolean enabled
) {
}
