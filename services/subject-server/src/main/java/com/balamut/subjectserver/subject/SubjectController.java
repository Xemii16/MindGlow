package com.balamut.subjectserver.subject;

import com.balamut.subjectserver.subject.request.CreateCourseRequest;
import com.balamut.subjectserver.subject.response.SubjectDeletePreparer;
import com.balamut.subjectserver.subject.response.SubjectResponse;
import com.balamut.subjectserver.subject.response.SubjectResponsePreparer;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/api/v1/subjects")
@RequiredArgsConstructor
public class SubjectController {

    private final SubjectService subjectService;
    private final SubjectResponsePreparer subjectResponsePreparer = new SubjectResponsePreparer();
    private final ListSubjectResponsePreparer listSubjectResponsePreparer = new ListSubjectResponsePreparer();
    private final SubjectDeletePreparer subjectDeletePreparer = new SubjectDeletePreparer();

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    public Mono<ResponseEntity<SubjectResponse>> create(@RequestBody CreateCourseRequest request) {
        return subjectResponsePreparer
                .prepare(subjectService.createCourse(request));
    }

    @GetMapping()
    public Mono<ResponseEntity<List<SubjectResponse>>> getSubjects() {
        return listSubjectResponsePreparer
                .prepare(subjectService.getAllSubjects());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    public Mono<ResponseEntity<Void>> delete(@PathVariable Integer id) {
        return subjectDeletePreparer.prepare(subjectService.deleteSubject(id));
    }
}
