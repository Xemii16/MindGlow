package com.balamut.authenticationserver.core;

public interface RestMapper<REQUEST, RESPONSE, ENTITY> {
    RESPONSE toResponse(ENTITY entity);

    ENTITY toEntity(REQUEST request);
}
