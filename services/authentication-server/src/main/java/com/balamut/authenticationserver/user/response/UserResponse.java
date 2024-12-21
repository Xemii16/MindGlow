package com.balamut.authenticationserver.user.response;

import io.swagger.v3.oas.annotations.media.Schema;

public record UserResponse(
        @Schema(example = "1")
        Integer id,
        @Schema(example = "John")
        String firstname,
        @Schema(example = "Doe")
        String lastname,
        @Schema(example = "john.doe@mail.com")
        String email,
        @Schema(example = "ADMIN")
        String role,
        @Schema(example = "false")
        boolean locked,
        @Schema(example = "true")
        boolean enabled
) {
}
