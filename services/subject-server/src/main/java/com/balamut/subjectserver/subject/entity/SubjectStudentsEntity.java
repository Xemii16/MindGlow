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
@Table("subject_students")
public class SubjectStudentsEntity {

    @Id
    private Integer id;
    private Integer subjectId;
    private Integer studentId;
}
