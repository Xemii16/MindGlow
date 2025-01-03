package com.balamut.webbff.core;

public interface Reader<T> {
    T read() throws Exception;
}
