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
        SubjectEntity math = new SubjectEntity(null, "Математика", "Наука, що досліджує числа, форми, закономірності та обчислення, розвиваючи логічне мислення, аналітичні здібності та навички розв’язання задач", "abcdbf", 2);
        SubjectEntity english = new SubjectEntity(null, "Англійська мова", "Вивчення мови, що розвиває навички спілкування, читання, письма та слухання, сприяючи культурному збагаченню та міжнародному спілкуванню.", "grefge", 3);
        SubjectEntity physics = new SubjectEntity(null, "Фізика", "Наука, що вивчає властивості матерії, енергії та їх взаємодію, пояснюючи природні явища через закони та експерименти.", "vddget", 4);
        SubjectEntity chemistry = new SubjectEntity(null, "Хімія", "Наука, що досліджує склад, властивості та перетворення речовин, розкриваючи механізми хімічних реакцій і їх практичне застосування.", "bxfgeg", 5);
        SubjectEntity biology = new SubjectEntity(null, "Біологія", "Наука, що вивчає живі організми, їх будову, функції та взаємодію з навколишнім середовищем, розкриваючи закони життя та їх роль у природі.", "bxfvdg", 6);
        SubjectEntity history = new SubjectEntity(null, "Історія", "Наука, що вивчає минуле людства, розвиваючи знання про події, особистості та культуру різних епох, сприяючи розумінню сучасності та майбутнього.", "bxfhhr", 7);
        SubjectEntity geography = new SubjectEntity(null, "Географія", "Наука, що досліджує Землю, її природні умови, населення та господарську діяльність, розкриваючи взаємозв’язки між людьми та природою.", "bxfbbv", 8);
        this.subjectEntityRepository
                .save(math)
                .then(this.subjectEntityRepository.save(english))
                .then(this.subjectEntityRepository.save(physics))
                .then(this.subjectEntityRepository.save(chemistry))
                .then(this.subjectEntityRepository.save(biology))
                .then(this.subjectEntityRepository.save(history))
                .then(this.subjectEntityRepository.save(geography))
                .then(Mono.fromRunnable(() -> log.info("Subjects have been saved")))
                .block();
        /*SubjectStudentsEntity subjectStudentsEntity = new SubjectStudentsEntity(null, 1, 4);
        SubjectStudentsEntity subjectStudentsEntity1 = new SubjectStudentsEntity(null, 2, 4);
        SubjectStudentsEntity subjectStudentsEntity2 = new SubjectStudentsEntity(null, 3, 4);
        SubjectStudentsEntity subjectStudentsEntity3 = new SubjectStudentsEntity(null, 4, 4);
        SubjectStudentsEntity subjectStudentsEntity4 = new SubjectStudentsEntity(null, 1, 5);
        SubjectStudentsEntity subjectStudentsEntity5 = new SubjectStudentsEntity(null, 2, 5);
        SubjectStudentsEntity subjectStudentsEntity6 = new SubjectStudentsEntity(null, 3, 5);
        SubjectStudentsEntity subjectStudentsEntity7 = new SubjectStudentsEntity(null, 4, 5);*/
        /*this.subjectStudentsEntityRepository
                .save(subjectStudentsEntity)
                .then(this.subjectStudentsEntityRepository.save(subjectStudentsEntity1))
                .then(this.subjectStudentsEntityRepository.save(subjectStudentsEntity2))
                .then(this.subjectStudentsEntityRepository.save(subjectStudentsEntity3))
                .then(this.subjectStudentsEntityRepository.save(subjectStudentsEntity4))
                .then(this.subjectStudentsEntityRepository.save(subjectStudentsEntity5))
                .then(this.subjectStudentsEntityRepository.save(subjectStudentsEntity6))
                .then(this.subjectStudentsEntityRepository.save(subjectStudentsEntity7))
                .then(Mono.fromRunnable(() -> log.info("SubjectStudents have been saved")))
                .block();*/
    }

    @Override
    public void close() {
        this.subjectEntityRepository.deleteAll().block();
        this.subjectStudentsEntityRepository.deleteAll().block();
        log.info("Deleted all subjects");
    }
}
