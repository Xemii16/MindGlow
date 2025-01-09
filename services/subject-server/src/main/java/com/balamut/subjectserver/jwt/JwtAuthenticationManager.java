package com.balamut.subjectserver.jwt;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

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
                    List<SimpleGrantedAuthority> authorities = Arrays.stream(claims.get("authorities", String[].class))
                            .map(SimpleGrantedAuthority::new)
                            .collect(Collectors.toList());
                    JwtUser user = new JwtUser(claims.get("sub", Integer.class), authorities, claims.get("locked", Boolean.class), claims.get("enabled", Boolean.class));
                    if (user.isLocked() || !user.isEnabled()) {
                        return Mono.error(new JwtAuthenticationException("User is locked or disabled"));
                    }
                    return Mono.just(JwtAuthentication.authenticated(user, (String) jwtAuthentication.getCredentials(), user.getAuthorities()));
                });
    }
}
