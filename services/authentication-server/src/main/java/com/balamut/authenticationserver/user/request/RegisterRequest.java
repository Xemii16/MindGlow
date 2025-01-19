package com.balamut.authenticationserver.user.request;

import io.swagger.v3.oas.annotations.media.Schema;

public record RegisterRequest(
        @Schema(description = "User's first name", example = "John")
        String firstname,
        @Schema(description = "User's last name", example = "Doe")
        String lastname,
        @Schema(description = "User's email", example = "john.doe@mail.com")
        String email,
        @Schema(description = "User's password", example = "password")
        String password,
        @Schema(description = "Role", example = "USER")
        String role
) {
}
