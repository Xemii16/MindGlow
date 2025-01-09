package com.balamut.authenticationserver.user.mapper;

import com.balamut.authenticationserver.user.request.RegisterRequest;
import com.balamut.authenticationserver.user.response.RegisterResponse;
import com.balamut.authenticationserver.core.RestMapper;
import com.balamut.authenticationserver.user.User;
import org.springframework.stereotype.Service;

@Service
public class RegisterUserMapper implements RestMapper<RegisterRequest, RegisterResponse, User> {
    @Override
    public RegisterResponse toResponse(User user) {
        return new RegisterResponse(user.getId());
    }

    @Override
    public User toEntity(RegisterRequest registerRequest) {
        return User.builder()
                .email(registerRequest.email())
                .firstname(registerRequest.firstname())
                .lastname(registerRequest.lastname())
                .password(registerRequest.password())
                .locked(false)
                .enabled(false)
                .build();
    }
}
