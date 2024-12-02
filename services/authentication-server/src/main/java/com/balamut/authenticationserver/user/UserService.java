package com.balamut.authenticationserver.user;

import com.balamut.authenticationserver.jwt.TokenType;
import com.balamut.authenticationserver.user.exception.UserException;
import com.balamut.authenticationserver.user.request.RegisterRequest;
import com.balamut.authenticationserver.user.response.RegisterResponse;
import com.balamut.authenticationserver.user.response.UserResponse;

import java.util.List;

public interface UserService {

    RegisterResponse register(RegisterRequest request) throws UserException;

    boolean matchesCredentials(String email, String password);

    String generateToken(String email, TokenType type) throws UserException;

    UserResponse getCurrentUser() throws UserException;

    List<UserResponse> getUsers(String role);

    void deleteUser(Integer id) throws UserException;
}
