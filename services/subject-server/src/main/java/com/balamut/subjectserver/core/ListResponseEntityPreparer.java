package com.balamut.subjectserver.core;

import org.springframework.http.ResponseEntity;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

public interface ListResponseEntityPreparer<T> {
    Mono<ResponseEntity<List<T>>> prepare(Flux<T> response);
}
