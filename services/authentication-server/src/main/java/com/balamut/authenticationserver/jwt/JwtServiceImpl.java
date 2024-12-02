package com.balamut.authenticationserver.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.KeyPair;
import java.time.Instant;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class JwtServiceImpl implements JwtService {

    @Value("${token.expiration.access}")
    private String accessTokenExpiration;
    @Value("${token.expiration.refresh}")
    private String refreshTokenExpiration;
    private final KeyPair keyPair;


    @Override
    public String build(JwtBuilder builder, TokenType type) {
        // TODO implement the method
        builder
                .issuedAt(Date.from(Instant.now()))
                .expiration(Date.from(Instant.now().plusSeconds(type == TokenType.ACCESS ? Long.parseLong(accessTokenExpiration) : Long.parseLong(refreshTokenExpiration))))
                .notBefore(Date.from(Instant.now()))
                .signWith(keyPair.getPrivate(), SignatureAlgorithm.RS256);
        return builder.compact();
    }

    @Override
    public Claims getPayload(String token) {
        return Jwts.parser()
                .verifyWith(keyPair.getPublic())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
