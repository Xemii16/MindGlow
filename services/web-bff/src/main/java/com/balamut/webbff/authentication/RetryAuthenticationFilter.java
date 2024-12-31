package com.balamut.webbff.authentication;

import com.balamut.webbff.client.AuthenticationServerClient;
import com.balamut.webbff.http.EmptyHeadersHttpResponseDecorator;
import com.balamut.webbff.session.AuthenticationSessionHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.cloud.gateway.support.ServerWebExchangeUtils;
import org.springframework.core.Ordered;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.server.reactive.ServerHttpResponseDecorator;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;
import reactor.netty.Connection;
import reactor.util.retry.RetrySpec;

@Component
@Slf4j
@RequiredArgsConstructor
public class RetryAuthenticationFilter implements GlobalFilter, Ordered {

    private final AuthenticationServerClient authenticationServerClient;
    private final AuthenticationSessionHandler sessionHandler;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        return chain.filter(exchange)
                /*.retryWhen(RetrySpec.max(1)
                        .filter(throwable -> {
                            HttpStatusCode status = exchange.getResponse().getStatusCode();
                            return status.is4xxClientError();
                        })
                        .doBeforeRetry(retrySignal -> log.info("Retrying request"))
                )
                .then(Mono.defer(() -> chain.filter(reset(exchange))))*/;
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