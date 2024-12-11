package com.balamut.subjectserver.core;

public interface Mapper <T, U> {
    U map(T t);
}
