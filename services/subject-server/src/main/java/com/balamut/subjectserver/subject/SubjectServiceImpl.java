package com.balamut.subjectserver.subject;

import com.balamut.subjectserver.core.Role;
import com.balamut.subjectserver.core.User;
import com.balamut.subjectserver.subject.entity.SubjectEntity;
import com.balamut.subjectserver.subject.entity.SubjectEntityRepository;
import com.balamut.subjectserver.subject.entity.SubjectStudentsEntity;
import com.balamut.subjectserver.subject.entity.SubjectStudentsEntityRepository;
import com.balamut.subjectserver.subject.exception.AccessDeniedSubjectException;
import com.balamut.subjectserver.subject.mapper.SubjectResponseMapper;
import com.balamut.subjectserver.subject.request.CreateCourseRequest;
import com.balamut.subjectserver.subject.response.PupilResponse;
import com.balamut.subjectserver.subject.response.SubjectResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Random;

@Service
@Slf4j
@RequiredArgsConstructor
public class SubjectServiceImpl implements SubjectService {

    private final SubjectEntityRepository subjectEntityRepository;
    private final SubjectStudentsEntityRepository subjectStudentsEntityRepository;
    private final SubjectResponseMapper subjectResponseMapper = new SubjectResponseMapper();

    @Override
    public Mono<SubjectResponse> createCourse(CreateCourseRequest request, User user) {
        if (user.getId() != request.teacherId() && !user.getAuthorities().contains("ROLE_ADMIN")) {
            log.debug("User with id {} has no rights to create course with teacher id {}", user.getId(), request.teacherId());
            return Mono.error(new AccessDeniedSubjectException("User has no rights to create course"));
        }
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
                    if (checkRole(user, Role.ADMIN)) {
                        return subjectEntityRepository.findAll();
                    }
                    if (checkRole(user, Role.TEACHER)) {
                        return subjectEntityRepository.findAllByTeacherId(user.getId());
                    }
                    if (checkRole(user, Role.STUDENT)) {
                        return subjectStudentsEntityRepository
                                .findAllByStudentId(user.getId())
                                .flatMap(entity -> subjectEntityRepository.findById(entity.getSubjectId()));
                    }
                    log.debug("User with id {} has no roles", user.getId());
                    return Flux.empty();
                })
                .map(subjectResponseMapper::map);
    }

    @Override
    public Mono<Void> deleteSubject(Integer id) {
        return ReactiveSecurityContextHolder.getContext()
                .map(securityContext -> (User) securityContext.getAuthentication().getPrincipal())
                .flatMap(user -> {
                    if (checkRole(user, Role.ADMIN)) {
                        return subjectEntityRepository.deleteById(id);
                    }
                    if (checkRole(user, Role.TEACHER)) {
                        return subjectEntityRepository.deleteByIdAndTeacherId(id, user.getId());
                    }
                    log.debug("User with id {} has no roles. Nothing deleted", user.getId());
                    return Mono.empty();
                })
                .then();
    }

    @Override
    public Flux<PupilResponse> getPupilsBySubject(Integer id) {
        return ReactiveSecurityContextHolder.getContext()
                .map(securityContext -> (User) securityContext.getAuthentication().getPrincipal())
                .flatMapMany(user -> {
                    if (checkRole(user, Role.ADMIN)) {
                        return subjectStudentsEntityRepository.findAllBySubjectId(id)
                                .map(SubjectStudentsEntity::getStudentId)
                                .map(PupilResponse::new);
                    }
                    if (checkRole(user, Role.TEACHER)) {
                        return subjectEntityRepository.findById(id)
                                .filter(subject -> subject.getTeacherId().equals(user.getId()))
                                .flatMapMany(subject -> subjectStudentsEntityRepository.findAllBySubjectId(id))
                                .map(SubjectStudentsEntity::getStudentId)
                                .map(PupilResponse::new);
                    }
                    return subjectStudentsEntityRepository
                            .findByStudentIdAndSubjectId(user.getId(), id)
                            .map(SubjectStudentsEntity::getSubjectId)
                            .flatMapMany(subjectStudentsEntityRepository::findAllBySubjectId)
                            .map(SubjectStudentsEntity::getStudentId)
                            .map(PupilResponse::new);
                });
    }

    @Override
    public Mono<Void> addPupilsToSubject(Integer id, List<Integer> pupilIds) {
        return ReactiveSecurityContextHolder.getContext()
                .map(securityContext -> (User) securityContext.getAuthentication().getPrincipal())
                .flatMapMany(user -> {
                    if (checkRole(user, Role.STUDENT)) {
                        return Flux.empty();
                    }
                    return subjectEntityRepository
                            .findById(id)
                            .filter(subject -> {
                                if (checkRole(user, Role.ADMIN)) {
                                    return true;
                                }
                                if (checkRole(user, Role.TEACHER)) {
                                    return subject.getTeacherId().equals(user.getId());
                                }
                                return false;
                            })
                            .flatMapMany(subject -> Flux.fromIterable(pupilIds)
                                    .map(pupilId -> SubjectStudentsEntity.builder()
                                            .subjectId(id)
                                            .studentId(pupilId)
                                            .build())
                                    .flatMap(subjectStudentsEntityRepository::save)
                            );
                })
                .then();
    }

    @Override
    public Mono<Void> removePupilsFromSubject(Integer id, List<Integer> pupilIds) {
        return ReactiveSecurityContextHolder.getContext()
                .map(securityContext -> (User) securityContext.getAuthentication().getPrincipal())
                .flatMap(user -> subjectEntityRepository.findById(id)
                        .filter(subject -> {
                            if (checkRole(user, Role.ADMIN)) {
                                return true;
                            }
                            if (checkRole(user, Role.TEACHER)) {
                                return subject.getTeacherId().equals(user.getId());
                            }
                            return false;
                        })
                        .map(SubjectEntity::getId)
                        .flatMapMany(subjectId -> Flux.fromIterable(pupilIds)
                                .flatMap(pupilId -> subjectStudentsEntityRepository
                                        .deleteBySubjectIdAndStudentId(subjectId, pupilId)
                                )
                        )
                        .then());
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

    private boolean checkRole(User user, Role role) {
        return user.getAuthorities().stream().anyMatch(authority -> authority.getAuthority().equals("ROLE_" + role.name()));
    }
}
