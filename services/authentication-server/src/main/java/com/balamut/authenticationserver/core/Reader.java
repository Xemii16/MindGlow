package com.balamut.authenticationserver.core;

public interface Reader<T> {
    T read() throws Exception;
}
