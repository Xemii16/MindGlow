package com.balamut.subjectserver.jwt;

import io.jsonwebtoken.Claims;
import reactor.core.publisher.Mono;

public interface ReactiveJwtService {

    Mono<Claims> parse(String token);
}
