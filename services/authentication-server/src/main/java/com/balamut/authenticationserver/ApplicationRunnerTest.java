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
        User user = repository.save(new User(null, "Maksym", "Balamut", "balamutmaks@gmail.com", "$2a$12$UBvzGVhJVU0TaR/mouJvQOntLRwwp1ONEXTotS/q2cnywYKyaComi", false, true, Role.ADMIN));
        user.getId();
    }
}
