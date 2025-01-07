package com.balamut.subjectserver.subject.mapper;

import com.balamut.subjectserver.core.Mapper;
import com.balamut.subjectserver.subject.entity.SubjectEntity;
import com.balamut.subjectserver.subject.response.SubjectResponse;

public class SubjectResponseMapper implements Mapper<SubjectEntity, SubjectResponse> {
    @Override
    public SubjectResponse map(SubjectEntity subject) {
        return SubjectResponse.builder()
                .id(subject.getId())
                .name(subject.getName())
                .code(subject.getCode())
                .description(subject.getDescription())
                .teacherId(subject.getTeacherId())
                .build();
    }
}
