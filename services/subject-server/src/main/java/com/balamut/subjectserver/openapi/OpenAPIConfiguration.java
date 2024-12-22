package com.balamut.subjectserver.openapi;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Subject Server API",
                version = "0.1.5-TEST",
                description = "Subject Server API"
        )
)
public class OpenAPIConfiguration {
}
