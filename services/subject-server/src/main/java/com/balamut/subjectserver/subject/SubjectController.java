package com.balamut.subjectserver.subject;

import com.balamut.subjectserver.core.User;
import com.balamut.subjectserver.subject.request.CreateCourseRequest;
import com.balamut.subjectserver.subject.response.PupilResponse;
import com.balamut.subjectserver.subject.response.SubjectResponse;
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

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    @Operation(summary = "Create a new course")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Course created successfully"),
            @ApiResponse(responseCode = "403", description = "No permission (only for teachers and admins)", content = {@Content})
    })
    public Mono<ResponseEntity<SubjectResponse>> create(@RequestBody CreateCourseRequest request, @AuthenticationPrincipal User user) {
        return subjectService.createCourse(request, user)
                .map(ResponseEntity::ok);
    }

    @GetMapping()
    @Operation(summary = "Get all subjects")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Subjects retrieved successfully"),
            @ApiResponse(responseCode = "403", description = "Unauthenticated", content = {@Content})
    })
    public Mono<ResponseEntity<List<SubjectResponse>>> getSubjects() {
        return subjectService.getAllSubjects()
                .collectList()
                .map(ResponseEntity::ok);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    @Operation(summary = "Delete a course")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Course deleted successfully"),
            @ApiResponse(responseCode = "403", description = "Unauthenticated", content = {@Content})
    })
    public Mono<ResponseEntity<Void>> delete(@PathVariable Integer id) {
        return subjectService.deleteSubject(id)
                .then(Mono.fromCallable(() -> ResponseEntity.noContent().build()));
    }

    @GetMapping("/{id}/pupils")
    public Mono<ResponseEntity<List<PupilResponse>>> getPupilsBySubject(@PathVariable Integer id) {
        return subjectService.getPupilsBySubject(id)
                .collectList()
                .map(ResponseEntity::ok);
    }

    @PutMapping("/{id}/pupils")
    public Mono<ResponseEntity<Void>> addPupilsToSubject(@PathVariable Integer id, @RequestBody List<Integer> pupilIds) {
        return subjectService.addPupilsToSubject(id, pupilIds)
                .then(Mono.fromCallable(() -> ResponseEntity.noContent().build()));
    }

    @DeleteMapping("/{id}/pupils")
    public Mono<ResponseEntity<Void>> removePupilsFromSubject(@PathVariable Integer id, @RequestBody List<Integer> pupilIds) {
        return subjectService.removePupilsFromSubject(id, pupilIds)
                .then(Mono.fromCallable(() -> ResponseEntity.noContent().build()));
    }
}
