package com.balamut.subjectserver.subject.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SubjectResponse {
    private Integer id;
    private String name;
    private String description;
    private String code;
    @JsonProperty("teacher_id")
    private Integer teacherId;
}
