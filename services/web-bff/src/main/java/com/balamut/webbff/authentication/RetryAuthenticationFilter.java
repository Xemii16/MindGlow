package com.balamut.webbff.authentication;

import com.balamut.webbff.client.AuthenticationServerClient;
import com.balamut.webbff.client.UnauthorizedClientException;
import com.balamut.webbff.http.EmptyHeadersHttpResponseDecorator;
import com.balamut.webbff.http.ServerWebExchangeUtilities;
import com.balamut.webbff.session.AuthenticationSessionHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.cloud.gateway.filter.factory.RetryGatewayFilterFactory;
import org.springframework.cloud.gateway.support.ServerWebExchangeUtils;
import org.springframework.core.Ordered;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpResponseDecorator;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;
import reactor.netty.Connection;

@Component
@RequiredArgsConstructor
public class RetryAuthenticationFilter implements GlobalFilter, Ordered {

    private final AuthenticationServerClient authenticationServerClient;
    private final AuthenticationSessionHandler sessionHandler;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        return chain.filter(exchange)
                .then(Mono.defer(() -> chain.filter(reset(exchange))));
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

    @Override
    public int getOrder() {
        return -2;
    }
}