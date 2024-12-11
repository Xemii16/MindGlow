package com.balamut.authenticationserver.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;

public interface JwtService {

    String build(JwtBuilder builder, TokenType type);

    Claims getPayload(String token);
}
