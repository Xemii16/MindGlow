package com.balamut.authenticationserver.user;

import com.balamut.authenticationserver.core.ResponseEntityExceptionHandler;
import com.balamut.authenticationserver.user.exception.UserNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class UserNotExistsExceptionHandler implements ResponseEntityExceptionHandler<UserNotFoundException> {

    @ExceptionHandler(UserNotFoundException.class)
    @Override
    public ResponseEntity<?> handle(UserNotFoundException e) {
        return ResponseEntity.notFound().build();
    }
}
