package com.balamut.webbff.authentication;

import com.balamut.webbff.http.ServerWebExchangeUtilities;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Slf4j
@Component
public class AuthenticationFilter implements GlobalFilter, Ordered {

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        return exchange.getSession().flatMap(session -> {
            if (exchange.getRequest().getURI().getPath().equals("/api/v1/authentication") && exchange.getRequest().getMethod() == HttpMethod.POST) {
                log.debug("Authentication request, skipping filter");
                return chain.filter(exchange);
            }
            if (session.isExpired() && !session.isStarted()) {
                log.debug("Session is expired and not started, skipping filter");
                return chain.filter(exchange);
            }
            log.debug("Session is not expired and started, adding bearer token to request");
            return chain.filter(ServerWebExchangeUtilities.mutateWithBearerToken(exchange, session.getAttribute("ACCESS_TOKEN")));
        });
    }

    @Override
    public int getOrder() {
        return HIGHEST_PRECEDENCE + 1;
    }
}
