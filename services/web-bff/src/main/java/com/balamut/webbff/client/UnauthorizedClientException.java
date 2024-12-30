package com.balamut.webbff.client;

import org.springframework.http.HttpStatus;

public class UnauthorizedClientException extends ClientException {

    public UnauthorizedClientException() {
        super(HttpStatus.UNAUTHORIZED);
    }
}
