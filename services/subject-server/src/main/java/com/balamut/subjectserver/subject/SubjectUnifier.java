package com.balamut.subjectserver.subject;

import com.balamut.subjectserver.core.Unifier;
import com.balamut.subjectserver.subject.entity.SubjectEntity;
import com.balamut.subjectserver.subject.entity.SubjectStudentsEntity;
import org.springframework.lang.NonNull;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

public class SubjectUnifier implements Unifier<SubjectEntity, Collection<SubjectStudentsEntity>, Subject> {

    @Override
    public Subject unify(@NonNull SubjectEntity first, @NonNull Collection<SubjectStudentsEntity> second) {
        Set<Integer> list = second.stream().map(SubjectStudentsEntity::getStudentId).collect(Collectors.toSet());
        return Subject.builder()
                .id(first.getId())
                .name(first.getName())
                .description(first.getDescription())
                .code(first.getCode())
                .teacherId(first.getTeacherId())
                .studentIds(list)
                .build();
    }
}
