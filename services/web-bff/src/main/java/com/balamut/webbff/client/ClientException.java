package com.balamut.webbff.client;

import org.springframework.http.HttpStatus;

public class ClientException extends RuntimeException {

    public ClientException(HttpStatus status) {
        super(String.format("Status %s", status));
    }
}
