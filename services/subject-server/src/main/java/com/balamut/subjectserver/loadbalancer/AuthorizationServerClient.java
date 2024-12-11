package com.balamut.subjectserver.loadbalancer;

import org.springframework.http.ResponseEntity;
import reactor.core.publisher.Mono;

public interface AuthorizationServerClient {

    Mono<ResponseEntity<User>> getUser(String jwt);
}
