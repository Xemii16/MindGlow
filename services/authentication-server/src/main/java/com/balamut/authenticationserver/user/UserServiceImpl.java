package com.balamut.authenticationserver.user;

import com.balamut.authenticationserver.jwt.JwtService;
import com.balamut.authenticationserver.jwt.TokenType;
import com.balamut.authenticationserver.user.exception.BadRegisterException;
import com.balamut.authenticationserver.user.exception.UserException;
import com.balamut.authenticationserver.user.exception.UserNotExistsException;
import com.balamut.authenticationserver.user.mapper.RegisterUserMapper;
import com.balamut.authenticationserver.user.mapper.UserJwtMapper;
import com.balamut.authenticationserver.user.request.RegisterRequest;
import com.balamut.authenticationserver.user.response.RegisterResponse;
import io.jsonwebtoken.JwtBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RegisterUserMapper registerUserMapper;
    private final UserJwtMapper userJwtMapper;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public RegisterResponse register(RegisterRequest request) throws UserException {
        if (userRepository.findByEmail(request.email()).isPresent()) {
            throw new BadRegisterException("Email already exists: " + request.email());
        }

        User user = userRepository.save(registerUserMapper.toEntity(request));
        return registerUserMapper.toResponse(user);
    }

    @Override
    public boolean matchesCredentials(String email, String password) throws UserException {
        User user = findUser(email);
        return matchesPassword(user, password);
    }

    @Override
    public String generateToken(String email, TokenType type) throws UserException {
        User user = findUser(email);
        return generateToken(user, type);
    }

    protected boolean matchesPassword(User user, String password) {
        return passwordEncoder.matches(password, user.getPassword());
    }

    protected String generateToken(User user, TokenType type) throws UserException {
        JwtBuilder builder = userJwtMapper.map(user);
        return jwtService.build(builder, type);
    }

    private User findUser(String email) throws UserException {
        return userRepository
                .findByEmail(email)
                .orElseThrow(() -> new UserNotExistsException(email));
    }
}
