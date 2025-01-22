package com.balamut.webbff;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebSession;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/logout")
public class LogoutController {

    @PostMapping
    public Mono<Void> logout(ServerWebExchange exchange) {
        return exchange.getSession()
                .flatMap(WebSession::invalidate);
    }
}
