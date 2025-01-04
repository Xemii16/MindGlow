package com.balamut.authenticationserver.authentication;

import com.balamut.authenticationserver.authentication.response.AuthenticationResponse;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/authentication")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "User authenticated successfully. Returned access and refresh tokens (JWT)"),
            @ApiResponse(responseCode = "403", description = "Invalid email or password", content = {@Content()})
    })
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestParam String email, @RequestParam String password) {
        return ResponseEntity.ok(authenticationService.authenticate(email, password));
    }

    @GetMapping("/refresh")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Access and refresh token refreshed successfully. Returned new access and refresh token (JWT)"),
            @ApiResponse(responseCode = "401", description = "Not authenticated", content = {@Content()})
    })
    public ResponseEntity<AuthenticationResponse> refresh() {
        return ResponseEntity.ok(authenticationService.refresh());
    }
}
