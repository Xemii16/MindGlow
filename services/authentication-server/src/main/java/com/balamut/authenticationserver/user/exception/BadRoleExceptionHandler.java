package com.balamut.authenticationserver.user.exception;

import com.balamut.authenticationserver.core.ResponseEntityExceptionHandler;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class BadRoleExceptionHandler implements ResponseEntityExceptionHandler<BadRoleException> {

    @Override
    @ExceptionHandler(BadRoleException.class)
    public ResponseEntity<?> handle(BadRoleException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }
}
