package com.balamut.subjectserver.subject;

import com.balamut.subjectserver.core.User;
import com.balamut.subjectserver.subject.request.CreateCourseRequest;
import com.balamut.subjectserver.subject.response.PupilResponse;
import com.balamut.subjectserver.subject.response.SubjectResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

public interface SubjectService {

    Mono<SubjectResponse> createCourse(CreateCourseRequest request, User user);

    Flux<SubjectResponse> getAllSubjects();

    Mono<Void> deleteSubject(Integer id);

    Flux<PupilResponse> getPupilsBySubject(Integer id);

    Mono<Void> addPupilsToSubject(Integer id, List<Integer> pupilIds);

    Mono<Void> removePupilsFromSubject(Integer id, List<Integer> pupilIds);
}
