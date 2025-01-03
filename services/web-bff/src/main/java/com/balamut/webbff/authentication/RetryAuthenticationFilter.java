package com.balamut.webbff.authentication;

import com.balamut.webbff.client.AuthenticationServerClient;
import com.balamut.webbff.client.UnauthorizedClientException;
import com.balamut.webbff.http.EmptyHeadersHttpResponseDecorator;
import com.balamut.webbff.jwt.ReactiveJwtService;
import com.balamut.webbff.session.AuthenticationSessionHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.cloud.gateway.support.ServerWebExchangeUtils;
import org.springframework.core.Ordered;
import org.springframework.http.server.reactive.ServerHttpResponseDecorator;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;
import reactor.netty.Connection;
import reactor.util.retry.Retry;

import java.util.concurrent.atomic.AtomicReference;

@Component
@Slf4j
@RequiredArgsConstructor
public class RetryAuthenticationFilter implements GlobalFilter, Ordered {

    private final AuthenticationServerClient authenticationServerClient;
    private final AuthenticationSessionHandler sessionHandler;
    private final ReactiveJwtService jwtService;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        return exchange.getSession().flatMap(session -> {
            String accessToken = session.getAttribute("ACCESS_TOKEN");
            if (accessToken == null) {
                return chain.filter(exchange);
            }
            return jwtService.verify(accessToken)
                    .onErrorResume(e -> {
                        log.debug("Access token verification failed", e);
                        return authenticationServerClient.refresh(session.getAttribute("REFRESH_TOKEN"))
                                .onErrorResume(UnauthorizedClientException.class, e2 -> {
                                    log.debug("Refresh token is expired", e2);
                                    return session.invalidate().then(Mono.empty());
                                })
                                .flatMap(response -> sessionHandler.handle(exchange, response));
                    })
                    .then(chain.filter(exchange));
        });
    }

    @Override
    public int getOrder() {
        return Ordered.HIGHEST_PRECEDENCE;
    }
}