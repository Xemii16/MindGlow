package com.balamut.subjectserver.core;

import org.springframework.http.ResponseEntity;
import reactor.core.publisher.Mono;

public interface ResponseEntityPreparer<T> {
    Mono<ResponseEntity<T>> prepare(Mono<T> response);
}
