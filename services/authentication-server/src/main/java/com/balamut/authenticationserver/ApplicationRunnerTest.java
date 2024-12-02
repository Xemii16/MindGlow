package com.balamut.authenticationserver;

import com.balamut.authenticationserver.user.Role;
import com.balamut.authenticationserver.user.User;
import com.balamut.authenticationserver.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ApplicationRunnerTest implements ApplicationRunner {

    private final UserRepository repository;
    @Override
    public void run(ApplicationArguments args) throws Exception {
        repository.save(new User(null, "Maksym", "Balamut", "balamutmaks@gmail.com", "$2a$12$UBvzGVhJVU0TaR/mouJvQOntLRwwp1ONEXTotS/q2cnywYKyaComi", false, true, Role.ADMIN));
        repository.save(new User(
                null,
                "Maksim",
                "Beleemet",
                "maksik@gmail.com",
                "$2a$12$UBvzGVhJVU0TaR/mouJvQOntLRwwp1ONEXTotS/q2cnywYKyaComi",
                false,
                true,
                Role.TEACHER
        ));
        repository.save(new User(
                null,
                "Igor",
                "Kere",
                "igorkere@gmail.com",
                "$2a$12$UBvzGVhJVU0TaR/mouJvQOntLRwwp1ONEXTotS/q2cnywYKyaComi",
                false,
                true,
                Role.TEACHER
        ));
        repository.save(new User(
                null,
                "Andriy",
                "Krav",
                "adriykrav@gmail.com",
                "$2a$12$UBvzGVhJVU0TaR/mouJvQOntLRwwp1ONEXTotS/q2cnywYKyaComi",
                false,
                true,
                Role.STUDENT
        ));
        repository.save(new User(
                null,
                "Vadim",
                "Tim",
                "vadymtim@gmail.com",
                "$2a$12$UBvzGVhJVU0TaR/mouJvQOntLRwwp1ONEXTotS/q2cnywYKyaComi",
                false,
                true,
                Role.STUDENT
        ));
    }
}
