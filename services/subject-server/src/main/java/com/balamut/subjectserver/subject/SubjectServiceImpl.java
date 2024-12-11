package com.balamut.subjectserver.subject;

import com.balamut.subjectserver.loadbalancer.User;
import com.balamut.subjectserver.subject.mapper.SubjectResponseMapper;
import com.balamut.subjectserver.subject.request.CreateCourseRequest;
import com.balamut.subjectserver.subject.response.SubjectResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Random;

@Service
@Slf4j
@RequiredArgsConstructor
public class SubjectServiceImpl implements SubjectService {

    private final SubjectEntityRepository subjectEntityRepository;
    private final SubjectStudentsEntityRepository subjectStudentsEntityRepository;
    private final SubjectResponseMapper subjectResponseMapper = new SubjectResponseMapper();

    @Override
    public Mono<SubjectResponse> createCourse(CreateCourseRequest request) {
        SubjectEntity entity = SubjectEntity.builder()
                .name(request.name())
                .code(generateSixCharacterCode())
                .description(request.description())
                .teacherId(request.teacherId())
                .build();
        return subjectEntityRepository.save(entity)
                .map(subjectResponseMapper::map);
    }

    @Override
    public Flux<SubjectResponse> getAllSubjects() {
        return ReactiveSecurityContextHolder.getContext()
                .map(securityContext -> (User) securityContext.getAuthentication().getPrincipal())
                .flatMapMany(user -> {
                    if (user.getAuthorities().contains("ROLE_ADMIN")) {
                        return subjectEntityRepository.findAll();
                    }
                    if (user.getAuthorities().contains("ROLE_TEACHER")) {
                        return subjectEntityRepository.findAllByTeacherId(user.id());
                    }
                    if (user.getAuthorities().contains("ROLE_STUDENT")) {
                        return subjectStudentsEntityRepository
                                .findAllByStudentId(user.id())
                                .flatMap(entity -> subjectEntityRepository.findById(entity.getSubjectId()));
                    }
                    log.debug("User with id {} has no roles", user.id());
                    return Flux.empty();
                })
                .map(subjectResponseMapper::map);
    }

    @Override
    public Mono<Void> deleteSubject(Integer id) {
        return ReactiveSecurityContextHolder.getContext()
                .map(securityContext -> (User) securityContext.getAuthentication().getPrincipal())
                .flatMap(user -> {
                    if (user.getAuthorities().contains("ROLE_ADMIN")) {
                        return subjectEntityRepository.deleteById(id);
                    }
                    if (user.getAuthorities().contains("ROLE_TEACHER")) {
                        return subjectEntityRepository.deleteByIdAndTeacherId(id, user.id());
                    }
                    log.debug("User with id {} has no roles. Nothing deleted", user.id());
                    return Mono.empty();
                })
                .then();
    }

    private String generateSixCharacterCode() {
        Random random = new Random();
        String alphabet = "abcdefghijklmnopqrstuvwxyz123456789";
        StringBuilder code = new StringBuilder();

        for (int i = 0; i < 6; i++) {
            int index = random.nextInt(alphabet.length());
            char randomChar = alphabet.charAt(index);
            code.append(randomChar);
        }

        return code.toString();
    }
}
