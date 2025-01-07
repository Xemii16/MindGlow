package com.balamut.subjectserver.subject.entity;

import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
public interface SubjectEntityRepository extends R2dbcRepository<SubjectEntity, Integer> {

    Flux<SubjectEntity> findAllByTeacherId(Integer teacherId);

    Mono<Void> deleteByIdAndTeacherId(Integer id, Integer teacherId);
}
