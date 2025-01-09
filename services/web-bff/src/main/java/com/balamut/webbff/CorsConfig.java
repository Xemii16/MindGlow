package com.balamut.webbff;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class CorsConfig {

    @Value("${cors.allow-credentials}")
    private boolean allowCredentials;
    @Value("#{'${cors.allowed-origins}'.split(',')}")
    private List<String> allowedOrigins;
    @Value("#{'${cors.allowed-methods}'.split(',')}")
    private List<String> allowedMethods;
    @Value("#{'${cors.allowed-headers}'.split(',')}")
    private List<String> allowedHeaders;

    @Bean
    public CorsWebFilter corsWebFilter() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(allowedOrigins);
        configuration.setAllowedMethods(allowedMethods);
        configuration.setAllowCredentials(allowCredentials);
        configuration.setAllowedHeaders(allowedHeaders);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return new CorsWebFilter(source);
    }
}
