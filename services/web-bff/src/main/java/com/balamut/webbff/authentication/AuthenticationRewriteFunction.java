package com.balamut.webbff.authentication;

import com.balamut.webbff.session.AuthenticationSessionHandler;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.reactivestreams.Publisher;
import org.springframework.cloud.gateway.filter.factory.rewrite.RewriteFunction;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
@RequiredArgsConstructor
@Slf4j
public class AuthenticationRewriteFunction implements RewriteFunction<String, String> {

    private static final Gson gson = new GsonBuilder()
            .setPrettyPrinting()
            .create();

    private final AuthenticationSessionHandler authenticationSessionHandler;

    @Override
    public Publisher<String> apply(ServerWebExchange serverWebExchange, String s) {
        if (!(serverWebExchange.getRequest().getMethod() == HttpMethod.POST)) {
            log.debug("Skipping rewrite for non-POST request");
            return Mono.just(s);
        }
        AuthenticationResponse response = gson.fromJson(s, AuthenticationResponse.class);
        log.trace("Rewriting response: {}", response);

        return authenticationSessionHandler.handle(serverWebExchange, response)
                .then(Mono.just(encryptedResponse()));
    }

    private String encryptedResponse() {
        return gson.toJson(new AuthenticationResponse("*", "*"));
    }
}
