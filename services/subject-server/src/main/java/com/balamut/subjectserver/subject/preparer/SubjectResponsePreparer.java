package com.balamut.subjectserver.subject.preparer;

import com.balamut.subjectserver.core.ResponseEntityPreparer;
import com.balamut.subjectserver.subject.response.SubjectResponse;
import org.springframework.http.ResponseEntity;
import reactor.core.publisher.Mono;

public class SubjectResponsePreparer implements ResponseEntityPreparer<SubjectResponse> {

    @Override
    public Mono<ResponseEntity<SubjectResponse>> prepare(Mono<SubjectResponse> response) {
        return response
                .map(ResponseEntity::ok)
                .onErrorResume(e -> Mono.just(ResponseEntity.badRequest().build()));
    }
}
