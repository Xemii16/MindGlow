package com.balamut.authenticationserver.core;

public interface Mapper <T, U> {
    U map(T t);
}
