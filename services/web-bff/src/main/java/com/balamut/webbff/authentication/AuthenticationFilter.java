package com.balamut.webbff.authentication;

import com.balamut.webbff.http.ServerWebExchangeUtilities;
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
            return chain.filter(ServerWebExchangeUtilities.mutateWithBearerToken(exchange, session.getAttribute("ACCESS_TOKEN")));
        });
    }

    @Override
    public int getOrder() {
        return HIGHEST_PRECEDENCE;
    }
}
