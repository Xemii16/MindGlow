package com.balamut.authenticationserver.user;

import com.balamut.authenticationserver.core.ResponseEntityExceptionHandler;
import com.balamut.authenticationserver.user.exception.UserNotExistsException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class UserNotExistsExceptionHandler implements ResponseEntityExceptionHandler<UserNotExistsException> {

    @ExceptionHandler(UserNotExistsException.class)
    @Override
    public ResponseEntity<?> handle(UserNotExistsException e) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
    }
}
