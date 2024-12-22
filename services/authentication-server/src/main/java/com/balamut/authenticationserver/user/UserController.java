package com.balamut.authenticationserver.user;

import com.balamut.authenticationserver.user.request.RegisterRequest;
import com.balamut.authenticationserver.user.request.UserRequest;
import com.balamut.authenticationserver.user.response.EmailResponse;
import com.balamut.authenticationserver.user.response.RegisterResponse;
import com.balamut.authenticationserver.user.response.UserResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    @Operation(summary = "Register a new user")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "User registered successfully and returned the id"),
            @ApiResponse(responseCode = "400", description = "Email already taken", content = {@Content()})
    })
    public ResponseEntity<RegisterResponse> register(@RequestBody RegisterRequest registerRequest) {
        return ResponseEntity.ok(userService.register(registerRequest));
    }

    @GetMapping("/me")
    @Operation(summary = "Get current user (authenticated)")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "User information successfully"),
            @ApiResponse(responseCode = "403", description = "Unauthenticated", content = {@Content()})
    })
    public ResponseEntity<UserResponse> getCurrentUser() {
        return ResponseEntity.ok(userService.getCurrentUser());
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a user")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "User deleted successfully"),
            @ApiResponse(responseCode = "403", description = "Unauthenticated", content = {@Content()})
    })
    public ResponseEntity<Void> deleteUser(@PathVariable Integer id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a user by id")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "User information successfully"),
            @ApiResponse(responseCode = "403", description = "Not allowed to get information (may be not permission)", content = {@Content()}),
            @ApiResponse(responseCode = "404", description = "User not found", content = {@Content()})
    })
    public ResponseEntity<UserResponse> getUser(@PathVariable Integer id) {
        return ResponseEntity.ok(userService.getUser(id));
    }

    @GetMapping
    @Operation(summary = "Get all users")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Users information successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid role", content = {@Content()}),
            @ApiResponse(responseCode = "403", description = "Not allowed by permission", content = {@Content()})
    })
    public ResponseEntity<List<UserResponse>> getUsers(
            @RequestParam(defaultValue = "all") @Parameter(description = "Type of user that returned")
            String role
    ) {
        return ResponseEntity.ok(userService.getUsers(role));
    }

    @GetMapping("/email/{email}")
    @Operation(summary = "Get user information by email")
    @ApiResponse(responseCode = "200", description = "Verify if email taken")
    public ResponseEntity<EmailResponse> getEmailInformation(@PathVariable String email) {
        return ResponseEntity.ok(userService.getEmailInformation(email));
    }

    @PutMapping("/me/password")
    @Operation(summary = "Change password")
    @ApiResponse(responseCode = "204", description = "Password changed successfully")
    public ResponseEntity<Void> changePassword(
            @RequestParam @Parameter(description = "New password")
            String password,
            @RequestParam("old_password") @Parameter(description = "Old password")
            String oldPassword
    ) {
        userService.changePassword(oldPassword, password);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Change user information")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "User information changed successfully"),
            @ApiResponse(responseCode = "403", description = "Bad credentials", content = {@Content()})
    })
    public ResponseEntity<Void> changeUser(@RequestBody UserRequest request, @PathVariable Integer id) {
        return userService.changeUser(id, request);
    }
}
