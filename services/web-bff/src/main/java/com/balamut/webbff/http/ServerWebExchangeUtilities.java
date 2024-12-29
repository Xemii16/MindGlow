package com.balamut.webbff.http;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.server.ServerWebExchange;

public class ServerWebExchangeUtilities {

    public static ServerWebExchange mutateWithBearerToken(ServerWebExchange exchange, String token) {
        ServerHttpRequest request = exchange.getRequest().mutate()
                .headers(headers -> headers.setBearerAuth(token))
                .build();
        return exchange.mutate()
                .request(request)
                .build();
    }
}
