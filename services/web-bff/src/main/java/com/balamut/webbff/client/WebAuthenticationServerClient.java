package com.balamut.webbff.client;

import com.balamut.webbff.authentication.AuthenticationResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.cloud.loadbalancer.annotation.LoadBalancerClient;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class WebAuthenticationServerClient implements AuthenticationServerClient {

    private final WebClient webClient;
    @Value("${mindglow.authentication-server.uri}")
    private String authenticationServerUri;

    public WebAuthenticationServerClient(@LoadBalanced WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder
                .baseUrl("lb://" + authenticationServerUri
                        .replace("http://", "")
                        .replace("https://", "")
                )
                .build();
    }

    @Override
    public Mono<AuthenticationResponse> refresh(String refreshToken) {
        // TODO: add retry logic
        return webClient
                .get()
                .uri("/api/v1/authentication/refresh")
                .header("Authorization", "Bearer " + refreshToken)
                .retrieve()
                .onStatus(status -> status.isSameCodeAs(HttpStatus.UNAUTHORIZED), response -> Mono.error(new UnauthorizedClientException()))
                .bodyToMono(AuthenticationResponse.class);
    }
}
