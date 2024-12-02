package com.balamut.authenticationserver.authentication.expection;

import com.balamut.authenticationserver.core.ResponseEntityExceptionHandler;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class BadCredentialsExceptionHandler implements ResponseEntityExceptionHandler<BadCredentialsException> {

    @Override
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<?> handle(BadCredentialsException e) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
    }
}
