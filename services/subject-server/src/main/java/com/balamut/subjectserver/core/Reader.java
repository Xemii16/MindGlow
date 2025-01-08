package com.balamut.subjectserver.core;

public interface Reader<T> {
    T read() throws Exception;
}
