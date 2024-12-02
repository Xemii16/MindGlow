package com.balamut.authenticationserver.jwt;

import io.jsonwebtoken.JwtBuilder;

public interface JwtService {

    String build(JwtBuilder builder, TokenType type);
}
