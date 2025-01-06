package com.balamut.subjectserver.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.security.KeyPair;

@Service
@RequiredArgsConstructor
public class ReactiveJwtServiceImpl implements ReactiveJwtService {

    private final KeyPair keyPair;

    @Override
    public Mono<Claims> parse(String token) {
        return Mono.fromRunnable(() -> Jwts.parser()
                .verifyWith(keyPair.getPublic())
                .build()
                .parseSignedClaims(token)
        );
    }
}
