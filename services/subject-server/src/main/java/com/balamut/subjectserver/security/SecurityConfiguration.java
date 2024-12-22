package com.balamut.subjectserver.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

@Configuration
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final BearerTokenAuthenticationFilter filter;

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
        http
                .cors(ServerHttpSecurity.CorsSpec::disable)
                .addFilterBefore(filter, SecurityWebFiltersOrder.ANONYMOUS_AUTHENTICATION)
                .csrf(ServerHttpSecurity.CsrfSpec::disable)
                .authorizeExchange(exchange -> exchange
                        .pathMatchers("/v3/api-docs/**", "/swagger-ui.html", "/webjars/swagger-ui/**").permitAll()
                        .anyExchange().authenticated()
                );
        return http.build();
    }
}
