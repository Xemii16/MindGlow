package com.balamut.subjectserver.subject;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Subject {

    private Integer id;
    private String name;
    private String description;
    private String code;
    private Integer teacherId;
    private Set<Integer> studentIds;
}
