package com.balamut.authenticationserver.user.exception;

import com.balamut.authenticationserver.core.ResponseEntityExceptionHandler;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class UserPermissionExceptionHandler implements ResponseEntityExceptionHandler<UserPermissionException> {

    @ExceptionHandler(UserPermissionException.class)
    @Override
    public ResponseEntity<?> handle(UserPermissionException e) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
    }
}
