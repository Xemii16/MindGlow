package com.balamut.webbff.session;

import org.springframework.web.server.WebSession;
import reactor.core.publisher.Mono;

public class WebSessionUtilities {

    public static Mono<String> getAttribute(Mono<WebSession> session, String key) {
        return session.mapNotNull(s -> s.getAttribute(key));
    }
}
