package com.balamut.authenticationserver.user.mapper;

import com.balamut.authenticationserver.core.Mapper;
import com.balamut.authenticationserver.user.User;
import com.balamut.authenticationserver.user.response.UserResponse;
import org.springframework.stereotype.Service;

@Service
public class UserResponseMapper implements Mapper<User, UserResponse> {

    @Override
    public UserResponse map(User user) {
        return new UserResponse(
                user.getId(),
                user.getFirstname(),
                user.getLastname(),
                user.getEmail(),
                user.getRole().name(),
                user.isLocked(),
                user.isEnabled()
        );
    }
}
