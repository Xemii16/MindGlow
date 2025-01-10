package com.balamut.authenticationserver.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
@Profile("demonstration")
public class DemonstrationUserRunner implements ApplicationRunner {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    @Override
    public void run(ApplicationArguments args) {
        User admin = new User(
                null,
                "Максим",
                "Баламут",
                "balamutmaks@gmail.com",
                passwordEncoder.encode("password"),
                false,
                true,
                Role.ADMIN
        );
        User teacher1 = new User(
                null,
                "Назар",
                "Коробчук",
                "nazark@gmail.com",
                passwordEncoder.encode("password"),
                false,
                true,
                Role.TEACHER
        );
        User teacher2 = new User(
                null,
                "Ілля",
                "Кольцовський",
                "ilyak@gmail.com ",
                passwordEncoder.encode("password"),
                false,
                true,
                Role.TEACHER
        );
        User student1 = new User(
                null,
                "Максим",
                "Карпенко",
                "maksk@gmail.com ",
                passwordEncoder.encode("password"),
                false,
                true,
                Role.STUDENT
        );
        User student2 = new User(
                null,
                "Андрій",
                "Кендир",
                "andriyk@gmail.com",
                passwordEncoder.encode("password"),
                false,
                true,
                Role.STUDENT
        );
        User disabledUser1 = new User(
                null,
                "Вадим",
                "Тищенко",
                "vadimt@gmail.com",
                passwordEncoder.encode("password"),
                false,
                false,
                Role.STUDENT
        );
        User disabledUser2 = new User(
                null,
                "Даниїл",
                "Кондела",
                "daniilk@gmail.com",
                passwordEncoder.encode("password"),
                false,
                false,
                Role.TEACHER
        );
        userRepository.save(admin);
        userRepository.save(teacher1);
        userRepository.save(teacher2);
        userRepository.save(student1);
        userRepository.save(student2);
        userRepository.save(disabledUser1);
        userRepository.save(disabledUser2);
        log.info("Users created (demonstration profile)");
    }
}
