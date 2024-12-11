package com.balamut.authenticationserver.core;

import org.springframework.http.ResponseEntity;

public interface ResponseEntityExceptionHandler<E> {

    ResponseEntity<?> handle(E e);
}
