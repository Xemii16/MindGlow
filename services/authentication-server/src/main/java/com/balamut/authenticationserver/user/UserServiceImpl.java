package com.balamut.authenticationserver.user;

import com.balamut.authenticationserver.authentication.expection.BadCredentialsException;
import com.balamut.authenticationserver.core.BadRequestException;
import com.balamut.authenticationserver.jwt.JwtService;
import com.balamut.authenticationserver.jwt.TokenType;
import com.balamut.authenticationserver.user.exception.BadRegisterException;
import com.balamut.authenticationserver.user.exception.UserException;
import com.balamut.authenticationserver.user.exception.UserNotFoundException;
import com.balamut.authenticationserver.user.exception.UserPermissionException;
import com.balamut.authenticationserver.user.mapper.RegisterUserMapper;
import com.balamut.authenticationserver.user.mapper.UserJwtMapper;
import com.balamut.authenticationserver.user.mapper.UserResponseMapper;
import com.balamut.authenticationserver.user.modifier.UserRequestModifier;
import com.balamut.authenticationserver.user.request.RegisterRequest;
import com.balamut.authenticationserver.user.request.UserRequest;
import com.balamut.authenticationserver.user.response.EmailResponse;
import com.balamut.authenticationserver.user.response.RegisterResponse;
import com.balamut.authenticationserver.user.response.UserResponse;
import io.jsonwebtoken.JwtBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RegisterUserMapper registerUserMapper;
    private final UserJwtMapper userJwtMapper;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final UserResponseMapper userResponseMapper;
    private final UserRequestModifier userRequestModifier;

    @Override
    public RegisterResponse register(RegisterRequest request) throws UserException {
        if (userRepository.findByEmail(request.email()).isPresent()) {
            throw new BadRegisterException("Email already exists: " + request.email());
        }
        User rawUser = registerUserMapper.toEntity(request);
        rawUser.setPassword(passwordEncoder.encode(request.password()));
        User user = userRepository.save(rawUser);
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

    @Override
    public UserResponse getCurrentUser() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userResponseMapper.map(user);
    }

    @Override
    public List<UserResponse> getUsers(String role) throws UserException {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        switch (role) {
            case "all" -> {
                if (user.getRole() != Role.ADMIN) {
                    throw new UserPermissionException("You are not allowed to see all users");
                }
                return StreamSupport.stream(userRepository.findAll().spliterator(), false)
                        .filter(u -> !u.getId().equals(user.getId()))
                        .map(userResponseMapper::map)
                        .collect(Collectors.toList());
            }
            case "teachers" -> {
                if (user.getRole() != Role.ADMIN) {
                    throw new UserPermissionException("You are not allowed to see teachers");
                }
                return userRepository.findAllByRole(Role.TEACHER).stream()
                        .map(userResponseMapper::map)
                        .collect(Collectors.toList());
            }
            case "students" -> {
                if (user.getRole() == Role.STUDENT) {
                    throw new UserPermissionException("You are not allowed to see students");
                }
                return userRepository.findAllByRole(Role.STUDENT).stream()
                        .map(userResponseMapper::map)
                        .collect(Collectors.toList());
            }
        }
        throw new BadRequestException("invalid role " + role);
    }

    @Override
    public void deleteUser(Integer id) throws UserException {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (user.getId().equals(id)) {
            throw new UserPermissionException("You are not allowed to delete yourself");
        }
        if (user.getRole() != Role.ADMIN) {
            throw new UserPermissionException("You are not allowed to delete users");
        }
        userRepository.deleteById(id);
    }

    @Override
    public UserResponse getUser(Integer id) throws UserException {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (user.getRole() == Role.ADMIN) {
            return userRepository.findById(id)
                    .map(userResponseMapper::map)
                    .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
        }
        if (user.getRole() == Role.STUDENT) {
            throw new UserPermissionException("You are not allowed to see users");
        }
        return userRepository.findById(id)
                .filter(u -> u.getRole() != Role.ADMIN)
                .map(userResponseMapper::map)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
    }

    @Override
    public EmailResponse getEmailInformation(String email) {
        return new EmailResponse(
                email,
                userRepository.existsByEmail(email)
        );
    }

    @Override
    public void changePassword(String oldPassword, String password) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!matchesPassword(user, oldPassword)) {
            throw new BadCredentialsException();
        }
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);
    }

    @Override
    public ResponseEntity<Void> changeUser(Integer id, UserRequest request) {
        User user = userRepository
                .findById(id)
                .orElseThrow(() -> new UserNotFoundException("User with id " + id + " not exists"));
        userRepository.save(userRequestModifier.modify(user, request));
        return null;
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
                .orElseThrow(() -> new UserNotFoundException(email));
    }
}
