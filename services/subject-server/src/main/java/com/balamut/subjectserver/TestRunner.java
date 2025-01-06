package com.balamut.subjectserver;

import com.balamut.subjectserver.subject.SubjectEntity;
import com.balamut.subjectserver.subject.SubjectEntityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile("demonstration")
@RequiredArgsConstructor
public class TestRunner implements ApplicationRunner {

    private final SubjectEntityRepository subjectEntityRepository;
    @Override
    public void run(ApplicationArguments args) {
        this.subjectEntityRepository.save(new SubjectEntity(null, "Математика", "Той хто вчить математику, той молодець :)", "vt3gr3", 1))
                .subscribe();
        this.subjectEntityRepository.save(new SubjectEntity(null, "Українська мова", "Незамінна річ у спілкуванні", "vfdgr", 1))
                .subscribe();
    }
}
