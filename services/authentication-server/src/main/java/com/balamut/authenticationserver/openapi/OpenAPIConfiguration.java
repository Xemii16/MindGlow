package com.balamut.authenticationserver.openapi;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title="Authentication Server API",
                version = "v0.0.7-TEST",
                license = @License(name = "MIT Licence")
        )
)
public class OpenAPIConfiguration {
}
