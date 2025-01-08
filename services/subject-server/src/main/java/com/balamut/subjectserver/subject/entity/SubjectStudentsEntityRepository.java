package com.balamut.subjectserver.subject.entity;

import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
public interface SubjectStudentsEntityRepository extends R2dbcRepository<SubjectStudentsEntity, Integer> {
    Flux<SubjectStudentsEntity> findAllByStudentId(Integer studentId);

    Flux<SubjectStudentsEntity> findAllBySubjectId(Integer subjectId);

    Mono<SubjectStudentsEntity> findByStudentIdAndSubjectId(Integer studentId, Integer subjectId);

    Mono<Void> deleteBySubjectIdAndStudentId(Integer subjectId, Integer studentId);
}
