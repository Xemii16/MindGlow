package com.balamut.subjectserver.security;

import com.balamut.subjectserver.loadbalancer.AuthorizationServerClient;
import com.balamut.subjectserver.loadbalancer.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextImpl;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

@Component
@RequiredArgsConstructor
@Slf4j
public class BearerTokenAuthenticationFilter implements WebFilter {

    private final AuthorizationServerClient authorizationServerClient;

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
        return ReactiveSecurityContextHolder.getContext().switchIfEmpty(Mono.defer(() -> {
                    String jwt = authorization.substring(7);
                    Mono<ResponseEntity<User>> response = authorizationServerClient.getUser(jwt);
                    return response
                            .flatMap(entity -> {
                                if (!entity.getStatusCode().is2xxSuccessful()) {
                                    log.debug("Failed to authenticate user: {}", entity);
                                    return chain.filter(exchange)
                                            .then(Mono.empty());
                                }
                                Authentication authentication = new UsernamePasswordAuthenticationToken(entity.getBody(), jwt, entity.getBody().getAuthorities());
                                SecurityContext securityContext = new SecurityContextImpl(authentication);
                                log.debug("Authenticated by bearer token: {}", securityContext);
                                return chain.filter(exchange)
                                        .contextWrite(ReactiveSecurityContextHolder.withSecurityContext(Mono.just(securityContext)))
                                        .then(Mono.empty());
                            });
                })).flatMap((securityContext) -> {
                    log.debug("SecurityContext: {}", securityContext);
                    return chain.filter(exchange);
                })
                .onErrorResume(e -> {
                    log.debug("Error when authenticating user by bearer token", e);
                    exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                    return chain.filter(exchange);
                });
    }
}
