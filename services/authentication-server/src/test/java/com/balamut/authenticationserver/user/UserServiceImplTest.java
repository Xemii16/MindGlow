package com.balamut.authenticationserver.user;

import com.balamut.authenticationserver.H2JpaTestConfiguration;
import com.balamut.authenticationserver.KeyPairTestConfiguration;
import com.balamut.authenticationserver.PasswordEncoderTestConfiguration;
import com.balamut.authenticationserver.core.BadRequestException;
import com.balamut.authenticationserver.jwt.JwtServiceImpl;
import com.balamut.authenticationserver.jwt.TokenType;
import com.balamut.authenticationserver.user.exception.BadRegisterException;
import com.balamut.authenticationserver.user.exception.BadRoleException;
import com.balamut.authenticationserver.user.exception.UserNotFoundException;
import com.balamut.authenticationserver.user.mapper.RegisterUserMapper;
import com.balamut.authenticationserver.user.mapper.UserJwtMapper;
import com.balamut.authenticationserver.user.mapper.UserResponseMapper;
import com.balamut.authenticationserver.user.modifier.UserRequestModifier;
import com.balamut.authenticationserver.user.request.RegisterRequest;
import com.balamut.authenticationserver.user.response.RegisterResponse;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Collections;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;

@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = {
        UserServiceImpl.class,
        H2JpaTestConfiguration.class,
        RegisterUserMapper.class,
        UserJwtMapper.class,
        JwtServiceImpl.class,
        UserResponseMapper.class,
        UserRequestModifier.class,
        KeyPairTestConfiguration.class,
        PasswordEncoderTestConfiguration.class
})
class UserServiceImplTest {

    @Autowired
    private UserServiceImpl userServiceImpl;

    private final static RegisterRequest REGISTER_REQUEST = new RegisterRequest("Maksym", "Balamut", "balamutmaks@mail.com", "password", "TEACHER");

    @DynamicPropertySource
    static void dynamicProperties(DynamicPropertyRegistry registry) {
        registry.add("token.expiration.access", () -> 300);
        registry.add("token.expiration.refresh", () -> 3600);
        registry.add("token.expiration.algorithm", () -> "RSA");
    }

    @AfterEach
    void tearDown() {
        // Delete all users from the repository
        userServiceImpl.deleteAll();
    }

    private void authenticateAdmin() {
        User user = new User(
                2,
                "Admin",
                "Admins",
                "admin@mail.com",
                "password",
                false,
                true,
                Role.ADMIN
        );
        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken(user, null, Collections.singleton(new SimpleGrantedAuthority("ROLE_ADMIN")))
        );
    }

    @Test
    void shouldRegisterAndReturnId() {
        assertThat(userServiceImpl.register(REGISTER_REQUEST)).hasNoNullFieldsOrProperties();
    }

    @Test
    void shouldRegisterAndSaveUserToRepository() {
        RegisterResponse registerResponse = userServiceImpl.register(REGISTER_REQUEST);
        authenticateAdmin();
        assertThat(userServiceImpl.getUser(registerResponse.id())).satisfies(user -> {
            assertThat(user.id()).isNotNull();
            assertThat(user.lastname()).isEqualTo(REGISTER_REQUEST.lastname());
            assertThat(user.firstname()).isEqualTo(REGISTER_REQUEST.firstname());
            assertThat(user.email()).isEqualTo(REGISTER_REQUEST.email());
            assertThat(user.role()).isEqualTo(REGISTER_REQUEST.role());
        });
    }

    @Test
    void shouldRegisterUserWhichAccountNotEnabled() {
        RegisterResponse registerResponse = userServiceImpl.register(REGISTER_REQUEST);
        authenticateAdmin();
        assertThat(userServiceImpl.getUser(registerResponse.id())).satisfies(user -> {
            assertThat(user.enabled()).isFalse();
        });
    }

    @Test
    void shouldRegisterUserWhichAccountNotLocked() {
        RegisterResponse registerResponse = userServiceImpl.register(REGISTER_REQUEST);
        authenticateAdmin();
        assertThat(userServiceImpl.getUser(registerResponse.id())).satisfies(user -> {
            assertThat(user.locked()).isFalse();
        });
    }

    @Test
    void shouldRegisterUserWhichRoleIsStudent() {
        RegisterResponse registerResponse = userServiceImpl.register(
                new RegisterRequest(
                        REGISTER_REQUEST.firstname(),
                        REGISTER_REQUEST.lastname(),
                        REGISTER_REQUEST.email(),
                        REGISTER_REQUEST.password(),
                        "STUDENT"
                )
        );
        authenticateAdmin();
        assertThat(userServiceImpl.getUser(registerResponse.id())).satisfies(user -> {
            assertThat(user.role()).isEqualTo(Role.STUDENT.name());
        });
    }

    @Test
    void shouldRegisterUserWhichRoleIsTeacher() {
        RegisterResponse registerResponse = userServiceImpl.register(
                new RegisterRequest(
                        REGISTER_REQUEST.firstname(),
                        REGISTER_REQUEST.lastname(),
                        REGISTER_REQUEST.email(),
                        REGISTER_REQUEST.password(),
                        "TEACHER"
                )
        );
        authenticateAdmin();
        assertThat(userServiceImpl.getUser(registerResponse.id())).satisfies(user -> {
            assertThat(user.role()).isEqualTo(Role.TEACHER.name());
        });
    }

    @Test
    void shouldFailRegistrationWithWrongRole() {
        assertThatThrownBy(() -> userServiceImpl.register(
                new RegisterRequest(
                        REGISTER_REQUEST.firstname(),
                        REGISTER_REQUEST.lastname(),
                        REGISTER_REQUEST.email(),
                        REGISTER_REQUEST.password(),
                        "WRONG_ROLE"
                )
        )).isInstanceOf(BadRoleException.class);
    }

    @Test
    void shouldFailRegistrationWithDuplicateEmail() {
        userServiceImpl.register(REGISTER_REQUEST);
        assertThatThrownBy(() -> userServiceImpl.register(REGISTER_REQUEST)).isInstanceOf(BadRegisterException.class);
    }

    @Test
    void shouldMatchCredentials() {
        userServiceImpl.register(REGISTER_REQUEST);
        assertThat(userServiceImpl.matchesCredentials(REGISTER_REQUEST.email(), REGISTER_REQUEST.password())).isTrue();
    }

    @Test
    void shouldFailMatchCredentialsWithWrongPassword() {
        userServiceImpl.register(REGISTER_REQUEST);
        assertThat(userServiceImpl.matchesCredentials(REGISTER_REQUEST.email(), "wrongPassword")).isFalse();
    }

    @Test
    void shouldFailMatchCredentialsWithWrongEmail() {
        userServiceImpl.register(REGISTER_REQUEST);
        assertThatThrownBy(() -> userServiceImpl.matchesCredentials("wrongEmail", "wrongPassword")).isInstanceOf(UserNotFoundException.class);
    }

    @Test
    void shouldGenerateAccessToken() {
        userServiceImpl.register(REGISTER_REQUEST);
        assertThat(userServiceImpl.generateToken(REGISTER_REQUEST.email(), TokenType.ACCESS)).isNotBlank();
    }

    @Test
    void shouldGenerateRefreshToken() {
        userServiceImpl.register(REGISTER_REQUEST);
        assertThat(userServiceImpl.generateToken(REGISTER_REQUEST.email(), TokenType.ACCESS)).isNotBlank();
    }

    @Test
    void shouldFailGenerateTokenWithWrongEmail() {
        assertThatThrownBy(() -> userServiceImpl.generateToken("wrongEmail", TokenType.ACCESS)).isInstanceOf(UserNotFoundException.class);
    }

    @Test
    void shouldFailGetAllUsersWithWrongRole() {
        authenticateAdmin();
        assertThatThrownBy(() -> userServiceImpl.getUsers("wrongRole")).isInstanceOf(BadRequestException.class);
    }

    @Test
    void shouldGetAllUsers() {
        userServiceImpl.register(REGISTER_REQUEST);
        authenticateAdmin();
        assertThat(userServiceImpl.getUsers("all")).satisfies(users -> {
            assertThat(users.getFirst()).satisfies(user -> {
                assertThat(user.firstname()).isEqualTo(REGISTER_REQUEST.firstname());
                assertThat(user.lastname()).isEqualTo(REGISTER_REQUEST.lastname());
                assertThat(user.email()).isEqualTo(REGISTER_REQUEST.email());
                assertThat(user.role()).isEqualTo(REGISTER_REQUEST.role());
            });
        });
    }

    @Test
    void shouldGetAllTeachers() {
        userServiceImpl.register(
                new RegisterRequest(
                        REGISTER_REQUEST.firstname(),
                        REGISTER_REQUEST.lastname(),
                        REGISTER_REQUEST.email(),
                        REGISTER_REQUEST.password(),
                        "TEACHER"
                )
        );
        authenticateAdmin();
        assertThat(userServiceImpl.getUsers("teachers")).satisfies(users -> {
            assertThat(users.getFirst()).satisfies(user -> {
                assertThat(user.firstname()).isEqualTo(REGISTER_REQUEST.firstname());
                assertThat(user.lastname()).isEqualTo(REGISTER_REQUEST.lastname());
                assertThat(user.email()).isEqualTo(REGISTER_REQUEST.email());
                assertThat(user.role()).isEqualTo(REGISTER_REQUEST.role());
            });
        });
    }

    @Test
    void shouldGetAllStudents() {
        userServiceImpl.register(
                new RegisterRequest(
                        REGISTER_REQUEST.firstname(),
                        REGISTER_REQUEST.lastname(),
                        REGISTER_REQUEST.email(),
                        REGISTER_REQUEST.password(),
                        "STUDENT"
                )
        );
        authenticateAdmin();
        assertThat(userServiceImpl.getUsers("students")).satisfies(users -> {
            assertThat(users.getFirst()).satisfies(user -> {
                assertThat(user.firstname()).isEqualTo(REGISTER_REQUEST.firstname());
                assertThat(user.lastname()).isEqualTo(REGISTER_REQUEST.lastname());
                assertThat(user.email()).isEqualTo(REGISTER_REQUEST.email());
                assertThat(user.role()).isEqualTo("STUDENT");
            });
        });
    }


}