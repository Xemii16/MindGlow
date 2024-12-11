package com.balamut.subjectserver.loadbalancer;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class AuthorizationServerClientImpl implements AuthorizationServerClient{

    private final WebClient client;

    public AuthorizationServerClientImpl(WebClient.Builder builder) {
        this.client = builder
                .baseUrl("http://mindglow-authentication-server-service:8080")
                .build();
    }
    @Override
    public Mono<ResponseEntity<User>> getUser(String jwt) {
        return client.get().uri("/api/v1/users/me")
                .header("Authorization", "Bearer " + jwt)
                .retrieve()
                .onStatus(status -> status.is4xxClientError() || status.is5xxServerError(),
                        response -> response.bodyToMono(String.class).flatMap(error -> Mono.error(new RuntimeException(error))))
                .toEntity(User.class);
    }
}
