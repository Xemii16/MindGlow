package com.balamut.subjectserver.subject.response;

import com.balamut.subjectserver.core.ResponseEntityPreparer;
import org.springframework.http.ResponseEntity;
import reactor.core.publisher.Mono;

public class SubjectResponsePreparer implements ResponseEntityPreparer<SubjectResponse> {
    @Override
    public Mono<ResponseEntity<SubjectResponse>> prepare(Mono<SubjectResponse> response) {
        // no logic
        return response.map(ResponseEntity::ok);
    }
}
