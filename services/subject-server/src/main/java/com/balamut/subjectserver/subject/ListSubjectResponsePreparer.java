package com.balamut.subjectserver.subject;

import com.balamut.subjectserver.core.ListResponseEntityPreparer;
import com.balamut.subjectserver.subject.response.SubjectResponse;
import org.springframework.http.ResponseEntity;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

public class ListSubjectResponsePreparer implements ListResponseEntityPreparer<SubjectResponse> {
    @Override
    public Mono<ResponseEntity<List<SubjectResponse>>> prepare(Flux<SubjectResponse> response) {
        return response.collectList().flatMap(l -> Mono.just(ResponseEntity.ok(l)));
    }
}
