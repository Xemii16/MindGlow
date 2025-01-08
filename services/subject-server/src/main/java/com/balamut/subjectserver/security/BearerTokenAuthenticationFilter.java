package com.balamut.subjectserver.security;

import com.balamut.subjectserver.jwt.JwtAuthentication;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

@Component
@RequiredArgsConstructor
@Slf4j
public class BearerTokenAuthenticationFilter implements WebFilter {

    private final ReactiveAuthenticationManager authenticationManager;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        String authorization = exchange.getRequest().getHeaders().getFirst("Authorization");
        if (authorization == null) {
            log.debug("No Authorization header found");
            return chain.filter(exchange);
        }
        if (!authorization.startsWith("Bearer ")) {
            log.debug("Authorization header does not start with 'Bearer '");
            return chain.filter(exchange);
        }
        String token = authorization.substring(7);
        if (token.isEmpty()) {
            log.debug("Empty token");
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return Mono.empty();
        }
        return authenticationManager.authenticate(JwtAuthentication.unauthenticated(token))
                .flatMap(authentication -> chain.filter(exchange)
                        .contextWrite(ReactiveSecurityContextHolder.withAuthentication(authentication))
                )
                .onErrorResume(throwable -> {
                    log.debug("Failed to authenticate", throwable);
                    return chain.filter(exchange);
                });
    }
}
