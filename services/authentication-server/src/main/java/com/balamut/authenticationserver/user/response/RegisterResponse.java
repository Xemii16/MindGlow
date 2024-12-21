package com.balamut.authenticationserver.user.response;

import io.swagger.v3.oas.annotations.media.Schema;

public record RegisterResponse(
        @Schema(example = "1")
        Integer id
) {
}
