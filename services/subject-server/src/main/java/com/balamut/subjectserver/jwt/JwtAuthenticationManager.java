package com.balamut.subjectserver.jwt;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationManager implements ReactiveAuthenticationManager {

    private final ReactiveJwtService jwtService;

    @Override
    public Mono<Authentication> authenticate(Authentication authentication) {
        if (!(authentication instanceof JwtAuthentication jwtAuthentication)) {
            return Mono.empty();
        }
        return jwtService.parse((String) jwtAuthentication.getCredentials())
                .onErrorMap(throwable -> new JwtAuthenticationException("Failed to parse JWT", throwable))
                .flatMap(claims -> {
                    JwtUser user = new JwtUser(claims.get("sub", Integer.class));
                    return Mono.just(JwtAuthentication.authenticated(user, (String) jwtAuthentication.getCredentials(), user.getAuthorities()));
                });
    }
}
