package com.balamut.webbff.authentication;

import lombok.RequiredArgsConstructor;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.cloud.gateway.support.ServerWebExchangeUtils;
import org.springframework.core.Ordered;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponseDecorator;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;
import reactor.netty.Connection;
import reactor.retry.Repeat;

import java.util.Collections;
import java.util.Set;

import static org.springframework.cloud.gateway.support.ServerWebExchangeUtils.CLIENT_RESPONSE_HEADER_NAMES;
import static org.springframework.cloud.gateway.support.ServerWebExchangeUtils.GATEWAY_ALREADY_ROUTED_ATTR;

@Component
@RequiredArgsConstructor
public class RetryAuthenticationFilter implements GlobalFilter, Ordered {

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        return chain.filter(exchange)
                .then(Mono.defer(() -> {
                    if (exchange.getResponse().getStatusCode() == HttpStatus.FORBIDDEN) {
                        ServerWebExchange mutatedExchange = mutateRequest(exchange, "new-token");
                        reset(exchange);
                        return chain.filter(mutatedExchange);
                    }
                    return Mono.empty();
                }));
    }

    private void reset(ServerWebExchange exchange) {
        Connection conn = exchange.getAttribute(ServerWebExchangeUtils.CLIENT_RESPONSE_CONN_ATTR);
        if (conn != null) {
            conn.dispose();
            exchange.getAttributes().remove(ServerWebExchangeUtils.CLIENT_RESPONSE_CONN_ATTR);
        }
        ServerWebExchangeUtils.removeAlreadyRouted(exchange);
        exchange.getResponse().getHeaders().clearContentHeaders();
    }

    private ServerWebExchange mutateRequest(ServerWebExchange exchange, String token) {
        ServerHttpRequest request = exchange.getRequest().mutate()
                .headers(headers -> headers.setBearerAuth(token))
                .build();
        ServerHttpResponseDecorator response = new ServerHttpResponseDecorator(exchange.getResponse()) {
            @Override
            public HttpHeaders getHeaders() {
                HttpHeaders headers = HttpHeaders.writableHttpHeaders(super.getHeaders());
                Set<String> addedHeaders = exchange.getAttributeOrDefault(CLIENT_RESPONSE_HEADER_NAMES, Collections.emptySet());
                addedHeaders.forEach(headers::remove);
                return headers;
            }
        };
        return exchange.mutate().request(request).response(response).build();
    }

    @Override
    public int getOrder() {
        return -2;
    }
}