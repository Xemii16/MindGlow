package com.balamut.subjectserver.core;

public interface Unifier<F, S, R> {
    R unify(F first, S second);
}
