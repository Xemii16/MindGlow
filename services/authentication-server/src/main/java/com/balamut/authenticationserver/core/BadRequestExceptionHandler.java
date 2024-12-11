package com.balamut.authenticationserver.core;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class BadRequestExceptionHandler implements ResponseEntityExceptionHandler<BadRequestException>{

    @ExceptionHandler(BadRequestException.class)
    @Override
    public ResponseEntity<?> handle(BadRequestException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }
}
