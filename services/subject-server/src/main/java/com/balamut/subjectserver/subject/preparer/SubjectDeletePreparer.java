package com.balamut.subjectserver.subject.preparer;

import com.balamut.subjectserver.core.ResponseEntityPreparer;
import org.springframework.http.ResponseEntity;
import reactor.core.publisher.Mono;

public class SubjectDeletePreparer implements ResponseEntityPreparer<Void> {

    @Override
    public Mono<ResponseEntity<Void>> prepare(Mono<Void> response) {
        return response
                .thenReturn(ResponseEntity.noContent().build());
    }
}
