package com.balamut.webbff.authentication;

import com.balamut.webbff.http.EmptyHeadersHttpResponseDecorator;
import lombok.RequiredArgsConstructor;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.cloud.gateway.support.ServerWebExchangeUtils;
import org.springframework.core.Ordered;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponseDecorator;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;
import reactor.netty.Connection;

@Component
@RequiredArgsConstructor
public class RetryAuthenticationFilter implements GlobalFilter, Ordered {

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        return chain.filter(exchange)
                .then(Mono.defer(() -> {
                    if (exchange.getResponse().getStatusCode() == HttpStatus.FORBIDDEN) {
                        ServerWebExchange mutatedExchange = mutateRequest(exchange, "new-token");
                        reset(mutatedExchange);
                        return chain.filter(reset(mutatedExchange));
                    }
                    return Mono.empty();
                }));
    }

    private ServerWebExchange reset(ServerWebExchange exchange) {
        Connection conn = exchange.getAttribute(ServerWebExchangeUtils.CLIENT_RESPONSE_CONN_ATTR);
        if (conn != null) {
            conn.dispose();
            exchange.getAttributes().remove(ServerWebExchangeUtils.CLIENT_RESPONSE_CONN_ATTR);
        }
        ServerWebExchangeUtils.removeAlreadyRouted(exchange);
        ServerHttpResponseDecorator response = new EmptyHeadersHttpResponseDecorator(exchange);
        return exchange.mutate()
                .response(response)
                .build();
    }

    private ServerWebExchange mutateRequest(ServerWebExchange exchange, String token) {
        ServerHttpRequest request = exchange.getRequest().mutate()
                .headers(headers -> headers.setBearerAuth(token))
                .build();
        return exchange.mutate()
                .request(request)
                .build();
    }

    @Override
    public int getOrder() {
        return -2;
    }
}