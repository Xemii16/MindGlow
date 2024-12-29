package com.balamut.webbff.authentication;

import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class AuthenticationFilter implements GlobalFilter, Ordered {

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        return exchange.getSession().flatMap(session -> {
            if (session.isExpired() && !session.isStarted()) {
                return chain.filter(exchange);
            }
            return chain.filter(mutateWithBearerToken(exchange, session.getAttribute("ACCESS_TOKEN")));
        });
    }

    @Override
    public int getOrder() {
        return HIGHEST_PRECEDENCE;
    }

    private ServerWebExchange mutateWithBearerToken(ServerWebExchange exchange, String token) {
        ServerHttpRequest request = exchange.getRequest().mutate()
                .header("Authorization", "Bearer " + token)
                .build();
        return exchange.mutate().request(request).build();
    }
}
