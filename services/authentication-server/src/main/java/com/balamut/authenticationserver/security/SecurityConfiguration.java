package com.balamut.authenticationserver.security;

import com.balamut.authenticationserver.core.KeyPairReader;
import com.balamut.authenticationserver.core.ResourceFileReader;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import java.security.KeyPair;

@Configuration
public class SecurityConfiguration {

    @Value("${token.algorithm}")
    private String algorithm;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable) // need to enable later
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/api/v1/users/register").anonymous()
                        .requestMatchers(HttpMethod.POST, "/api/v1/authentication").anonymous()
                );
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // need to configure later
    }

    @Bean
    public KeyPair keyPair() throws Exception {
        ResourceFileReader publicKeyReader = new ResourceFileReader("key.public");
        ResourceFileReader privateKeyReader = new ResourceFileReader("key.private");
        KeyPairReader keyPairReader = new KeyPairReader(algorithm, publicKeyReader, privateKeyReader);
        return keyPairReader.read();
    }
}
