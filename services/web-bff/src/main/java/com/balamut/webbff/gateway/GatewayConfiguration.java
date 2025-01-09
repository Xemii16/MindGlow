package com.balamut.webbff.gateway;

import com.balamut.webbff.authentication.AuthenticationRewriteFunction;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class GatewayConfiguration {

    private final AuthenticationRewriteFunction authenticationRewriteFunction;
    @Value("${mindglow.authentication-server.uri}")
    private String authenticationServerUri;

    @Bean
    public RouteLocator authenticationServerAuthenticationRoute(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("authentication-server-auth", r -> r.path("/api/v1/authentication/**")
                        .filters(f -> f
                                .modifyResponseBody(String.class, String.class, authenticationRewriteFunction)
                        )
                        .uri(authenticationServerUri)
                )
                .build();
    }
}
