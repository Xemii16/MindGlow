package com.balamut.webbff.jwt;

import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.util.context.ContextView;

import java.security.KeyPair;

@Service
@RequiredArgsConstructor
public class ReactiveJwtServiceImpl implements ReactiveJwtService {

    private final KeyPair keyPair;

    @Override
    public Mono<Void> verify(String token) {
        return Mono.fromRunnable(() -> Jwts.parser()
                .verifyWith(keyPair.getPublic())
                .build()
                .parse(token)
        );
    }
}
