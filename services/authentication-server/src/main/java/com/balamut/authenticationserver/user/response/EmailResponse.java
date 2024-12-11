package com.balamut.authenticationserver.user.response;

public record EmailResponse(
        String email,
        boolean taken
) {
}
