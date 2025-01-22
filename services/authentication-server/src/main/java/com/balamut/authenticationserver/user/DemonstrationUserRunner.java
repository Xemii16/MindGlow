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
                "ilyak@gmail.com",
                passwordEncoder.encode("password"),
                false,
                true,
                Role.TEACHER
        );
        User teacher3 = new User(
                null,
                "Меланія",
                "Третяк",
                "melaniat@gmail.com",
                passwordEncoder.encode("password"),
                false,
                true,
                Role.TEACHER
        );
        User teacher4 = new User(
                null,
                "Марія",
                "Мельник",
                "mariyam@gmail.com",
                passwordEncoder.encode("password"),
                false,
                true,
                Role.TEACHER
        );
        User teacher5 = new User(
                null,
                "Олександр",
                "Петренко",
                "olexandrp@gmail.com",
                passwordEncoder.encode("password"),
                false,
                true,
                Role.TEACHER
        );
        User teacher6 = new User(
                null,
                "Олена",
                "Коваль",
                "olenak@gmail.com",
                passwordEncoder.encode("password"),
                false,
                true,
                Role.TEACHER
        );
        User teacher7 = new User(
                null,
                "Віктор",
                "Сидоренко",
                "victors@gmail.com",
                passwordEncoder.encode("password"),
                false,
                true,
                Role.TEACHER
        );
        User teacher8 = new User(
                null,
                "Ірина",
                "Шевченко",
                "irinash@gmail.com",
                passwordEncoder.encode("password"),
                false,
                true,
                Role.TEACHER
        );
        User teacher9 = new User(
                null,
                "Дмитро",
                "Кравченко",
                "dmytrok@gmail.com",
                passwordEncoder.encode("password"),
                false,
                true,
                Role.TEACHER
        );
        User teacher10 = new User(
                null,
                "Анна",
                "Лисенко",
                "annal@gmail.com",
                passwordEncoder.encode("password"),
                false,
                true,
                Role.TEACHER
        );
        User student1 = new User(
                null,
                "Максим",
                "Карпенко",
                "maksk@gmail.com",
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
        User student3 = new User(
                null,
                "Олексій",
                "Бондаренко",
                "oleksiyb@gmail.com",
                passwordEncoder.encode("password"),
                false,
                true,
                Role.STUDENT
        );
        User student4 = new User(
                null,
                "Іван",
                "Гончар",
                "ivang@gmail.com",
                passwordEncoder.encode("password"),
                false,
                true,
                Role.STUDENT
        );
        User student5 = new User(
                null,
                "Олег",
                "Демченко",
                "olegd@gmail.com",
                passwordEncoder.encode("password"),
                false,
                true,
                Role.STUDENT
        );
        User student6 = new User(
                null,
                "Володимир",
                "Захарченко",
                "volodymyrz@gmail.com",
                passwordEncoder.encode("password"),
                false,
                true,
                Role.STUDENT
        );
        User student7 = new User(
                null,
                "Сергій",
                "Іванов",
                "serhiyiv@gmail.com",
                passwordEncoder.encode("password"),
                false,
                true,
                Role.STUDENT
        );
        User student8 = new User(
                null,
                "Денис",
                "Ковтун",
                "denysk@gmail.com",
                passwordEncoder.encode("password"),
                false,
                true,
                Role.STUDENT
        );
        User student9 = new User(
                null,
                "Юрій",
                "Литвин",
                "yuriyl@gmail.com",
                passwordEncoder.encode("password"),
                false,
                true,
                Role.STUDENT
        );
        User student10 = new User(
                null,
                "Артем",
                "Мартинюк",
                "artemm@gmail.com",
                passwordEncoder.encode("password"),
                false,
                true,
                Role.STUDENT
        );
        User student11 = new User(
                null,
                "Віталій",
                "Нестеренко",
                "vitaliy@gmail.com",
                passwordEncoder.encode("password"),
                false,
                true,
                Role.STUDENT
        );
        User student12 = new User(
                null,
                "Роман",
                "Олійник",
                "roman@gmail.com",
                passwordEncoder.encode("password"),
                false,
                true,
                Role.STUDENT
        );
        User student13 = new User(
                null,
                "Василь",
                "Павленко",
                "vasyl@gmail.com",
                passwordEncoder.encode("password"),
                false,
                true,
                Role.STUDENT
        );
        User student14 = new User(
                null,
                "Михайло",
                "Романенко",
                "mykhailo@gmail.com",
                passwordEncoder.encode("password"),
                false,
                true,
                Role.STUDENT
        );
        User student15 = new User(
                null,
                "Тарас",
                "Савченко",
                "taras@gmail.com",
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
        User disabledUser3 = new User(
                null,
                "Стас",
                "Аббакумов",
                "stasa@gmail.com",
                passwordEncoder.encode("password"),
                false,
                false,
                Role.TEACHER
        );
        userRepository.save(admin);
        userRepository.save(teacher1);
        userRepository.save(teacher2);
        userRepository.save(teacher3);
        userRepository.save(teacher4);
        userRepository.save(teacher5);
        userRepository.save(teacher6);
        userRepository.save(teacher7);
        userRepository.save(teacher8);
        userRepository.save(teacher9);
        userRepository.save(teacher10);
        userRepository.save(student1);
        userRepository.save(student2);
        userRepository.save(student3);
        userRepository.save(student4);
        userRepository.save(student5);
        userRepository.save(student6);
        userRepository.save(student7);
        userRepository.save(student8);
        userRepository.save(student9);
        userRepository.save(student10);
        userRepository.save(student11);
        userRepository.save(student12);
        userRepository.save(student13);
        userRepository.save(student14);
        userRepository.save(student15);
        userRepository.save(disabledUser1);
        userRepository.save(disabledUser2);
        userRepository.save(disabledUser3);
        log.info("Users created (demonstration profile)");
    }
}
