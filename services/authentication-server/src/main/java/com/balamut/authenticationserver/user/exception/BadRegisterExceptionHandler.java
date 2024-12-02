package com.balamut.authenticationserver.user.exception;

import com.balamut.authenticationserver.core.ResponseEntityExceptionHandler;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class BadRegisterExceptionHandler implements ResponseEntityExceptionHandler<BadRegisterException> {

    @ExceptionHandler(BadRegisterException.class)
    @Override
    public ResponseEntity<?> handle(BadRegisterException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }
}
