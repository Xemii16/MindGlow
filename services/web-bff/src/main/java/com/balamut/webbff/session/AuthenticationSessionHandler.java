package com.balamut.webbff.session;

import com.balamut.webbff.authentication.AuthenticationResponse;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

public interface AuthenticationSessionHandler {

    Mono<Void> handle(ServerWebExchange exchange, AuthenticationResponse response);
}
