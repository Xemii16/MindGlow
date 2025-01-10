package com.balamut.subjectserver.flyway;

import org.flywaydb.core.Flyway;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FlywayConfiguration {

    @Value("${spring.flyway.url}")
    private String url;
    @Value("${spring.flyway.user}")
    private String user;
    @Value("${spring.flyway.password}")
    private String password;

    @Bean
    public Flyway flyway() {
        Flyway flyway = Flyway.configure()
                .dataSource(url, user, password)
                .locations("classpath:db/migration")
                .load();
        flyway.baseline();
        flyway.migrate();
        return flyway;
    }
}
