package com.balamut.authenticationserver.core;

public interface Modifier <E, M> {
    E modify(E entity, M modifier);
}
