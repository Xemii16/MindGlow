package com.balamut.subjectserver.subject.request;

import com.fasterxml.jackson.annotation.JsonProperty;

public record CreateCourseRequest(
        String name,
        String description,
        @JsonProperty("teacher_id") int teacherId
) {
}
