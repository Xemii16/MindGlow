package com.balamut.subjectserver.subject.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table("subjects")
public class SubjectEntity {

    @Id
    private Integer id;
    private String name;
    private String description;
    private String code;
    private Integer teacherId;
}
