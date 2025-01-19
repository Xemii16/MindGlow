package com.balamut.authenticationserver.user.mapper;

import com.balamut.authenticationserver.user.Role;
import com.balamut.authenticationserver.user.exception.BadRegisterException;
import com.balamut.authenticationserver.user.exception.BadRoleException;
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
        try {
            Role.valueOf(registerRequest.role());
        } catch (IllegalArgumentException e) {
            throw new BadRoleException("Invalid role: " + registerRequest.role());
        }
        if (Role.valueOf(registerRequest.role()) == Role.ADMIN) {
            throw new BadRoleException("Cannot register an admin");
        }
        return User.builder()
                .email(registerRequest.email())
                .firstname(registerRequest.firstname())
                .lastname(registerRequest.lastname())
                .password(registerRequest.password())
                .role(Role.valueOf(registerRequest.role()))
                .locked(false)
                .enabled(false)
                .build();
    }
}
