package com.balamut.subjectserver.subject;

import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface SubjectStudentsEntityRepository extends R2dbcRepository<SubjectStudentsEntity, Integer> {
    Flux<SubjectStudentsEntity> findAllByStudentId(Integer studentId);
}
