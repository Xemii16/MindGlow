package com.balamut.subjectserver.subject;

import com.balamut.subjectserver.subject.request.CreateCourseRequest;
import com.balamut.subjectserver.subject.response.SubjectResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface SubjectService {

    Mono<SubjectResponse> createCourse(CreateCourseRequest request);

    Flux<SubjectResponse> getAllSubjects();

    Mono<Void> deleteSubject(Integer id);
}
