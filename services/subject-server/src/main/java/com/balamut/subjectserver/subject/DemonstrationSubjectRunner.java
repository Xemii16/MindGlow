package com.balamut.subjectserver.subject;

import com.balamut.subjectserver.subject.entity.SubjectEntity;
import com.balamut.subjectserver.subject.entity.SubjectEntityRepository;
import com.balamut.subjectserver.subject.entity.SubjectStudentsEntity;
import com.balamut.subjectserver.subject.entity.SubjectStudentsEntityRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

@Component
@Profile("demonstration")
@RequiredArgsConstructor
@Slf4j
public class DemonstrationSubjectRunner implements ApplicationRunner, AutoCloseable {

    private final SubjectEntityRepository subjectEntityRepository;
    private final SubjectStudentsEntityRepository subjectStudentsEntityRepository;

    @Override
    public void run(ApplicationArguments args) {
        SubjectEntity math = new SubjectEntity(null, "Math", "Math is cool", "abcdbf", 2);
        SubjectEntity english = new SubjectEntity(null, "English", "English is cool", "grefge", 2);
        SubjectEntity physics = new SubjectEntity(null, "Physics", "Physics is cool", "vddget", 3);
        SubjectEntity chemistry = new SubjectEntity(null, "Chemistry", "Chemistry is cool", "bxfgeg", 3);
        this.subjectEntityRepository
                .save(math)
                .then(this.subjectEntityRepository.save(english))
                .then(this.subjectEntityRepository.save(physics))
                .then(this.subjectEntityRepository.save(chemistry))
                .then(Mono.fromRunnable(() -> log.info("Subjects have been saved")))
                .block();
        SubjectStudentsEntity subjectStudentsEntity = new SubjectStudentsEntity(null, 1, 4);
        SubjectStudentsEntity subjectStudentsEntity1 = new SubjectStudentsEntity(null, 2, 4);
        SubjectStudentsEntity subjectStudentsEntity2 = new SubjectStudentsEntity(null, 3, 4);
        SubjectStudentsEntity subjectStudentsEntity3 = new SubjectStudentsEntity(null, 4, 4);
        SubjectStudentsEntity subjectStudentsEntity4 = new SubjectStudentsEntity(null, 1, 5);
        SubjectStudentsEntity subjectStudentsEntity5 = new SubjectStudentsEntity(null, 2, 5);
        SubjectStudentsEntity subjectStudentsEntity6 = new SubjectStudentsEntity(null, 3, 5);
        SubjectStudentsEntity subjectStudentsEntity7 = new SubjectStudentsEntity(null, 4, 5);
        this.subjectStudentsEntityRepository
                .save(subjectStudentsEntity)
                .then(this.subjectStudentsEntityRepository.save(subjectStudentsEntity1))
                .then(this.subjectStudentsEntityRepository.save(subjectStudentsEntity2))
                .then(this.subjectStudentsEntityRepository.save(subjectStudentsEntity3))
                .then(this.subjectStudentsEntityRepository.save(subjectStudentsEntity4))
                .then(this.subjectStudentsEntityRepository.save(subjectStudentsEntity5))
                .then(this.subjectStudentsEntityRepository.save(subjectStudentsEntity6))
                .then(this.subjectStudentsEntityRepository.save(subjectStudentsEntity7))
                .then(Mono.fromRunnable(() -> log.info("SubjectStudents have been saved")))
                .block();
    }

    @Override
    public void close() {
        this.subjectEntityRepository.deleteAll().block();
        this.subjectStudentsEntityRepository.deleteAll().block();
        log.info("Deleted all subjects");
    }
}
