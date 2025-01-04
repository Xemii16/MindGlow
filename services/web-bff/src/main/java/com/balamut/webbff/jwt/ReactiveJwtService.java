package com.balamut.webbff.jwt;

import reactor.core.publisher.Mono;

public interface ReactiveJwtService {

    Mono<Void> verify(String token);
}
