package com.balamut.webbff.client;

import com.balamut.webbff.authentication.AuthenticationResponse;
import reactor.core.publisher.Mono;

public interface AuthenticationServerClient {

    Mono<AuthenticationResponse> refresh(String refreshToken);
}
