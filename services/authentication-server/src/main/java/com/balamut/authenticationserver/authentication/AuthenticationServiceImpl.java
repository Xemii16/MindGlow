package com.balamut.authenticationserver.authentication;

import com.balamut.authenticationserver.authentication.expection.BadCredentialsException;
import com.balamut.authenticationserver.authentication.response.AuthenticationResponse;
import com.balamut.authenticationserver.jwt.TokenType;
import com.balamut.authenticationserver.user.UserService;
import com.balamut.authenticationserver.user.exception.UserException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserService userService;

    @Override
    public AuthenticationResponse authenticate(String email, String password) throws UserException {
        if (!userService.matchesCredentials(email, password)) {
            throw new BadCredentialsException();
        }
        String accessToken = userService.generateToken(email, TokenType.ACCESS);
        String refreshToken = userService.generateToken(email, TokenType.REFRESH);
        return new AuthenticationResponse(accessToken, refreshToken);
    }
}
