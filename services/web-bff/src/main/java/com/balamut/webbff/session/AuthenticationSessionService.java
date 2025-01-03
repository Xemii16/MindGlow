package com.balamut.webbff.session;

import reactor.core.publisher.Mono;

public interface AuthenticationSessionService {

    Mono<Void> refreshTokens(String accessToken, String refreshToken);
}
