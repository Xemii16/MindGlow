package com.balamut.authenticationserver.authentication;

import com.balamut.authenticationserver.authentication.response.AuthenticationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/authentication")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestParam String email, @RequestParam String password) {
        return ResponseEntity.ok(authenticationService.authenticate(email, password));
    }

    @GetMapping("/refresh")
    public ResponseEntity<AuthenticationResponse> refresh() {
        return ResponseEntity.ok(authenticationService.refresh());
    }
}
