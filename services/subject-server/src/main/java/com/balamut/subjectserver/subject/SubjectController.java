package com.balamut.subjectserver.subject;

import com.balamut.subjectserver.core.User;
import com.balamut.subjectserver.subject.preparer.ListSubjectResponsePreparer;
import com.balamut.subjectserver.subject.request.CreateCourseRequest;
import com.balamut.subjectserver.subject.preparer.SubjectDeletePreparer;
import com.balamut.subjectserver.subject.response.SubjectResponse;
import com.balamut.subjectserver.subject.preparer.SubjectResponsePreparer;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
    @Operation(summary = "Create a new course")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Course created successfully"),
            @ApiResponse(responseCode = "403", description = "No permission (only for teachers and admins)", content = {@Content})
    })
    public Mono<ResponseEntity<SubjectResponse>> create(@RequestBody CreateCourseRequest request, @AuthenticationPrincipal User user) {
        return subjectResponsePreparer
                .prepare(subjectService.createCourse(request, user));
    }

    @GetMapping()
    @Operation(summary = "Get all subjects")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Subjects retrieved successfully"),
            @ApiResponse(responseCode = "403", description = "Unauthenticated", content = {@Content})
    })
    public Mono<ResponseEntity<List<SubjectResponse>>> getSubjects() {
        return listSubjectResponsePreparer
                .prepare(subjectService.getAllSubjects());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    @Operation(summary = "Delete a course")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Course deleted successfully"),
            @ApiResponse(responseCode = "403", description = "Unauthenticated", content = {@Content})
    })
    public Mono<ResponseEntity<Void>> delete(@PathVariable Integer id) {
        return subjectDeletePreparer.prepare(subjectService.deleteSubject(id));
    }
}
