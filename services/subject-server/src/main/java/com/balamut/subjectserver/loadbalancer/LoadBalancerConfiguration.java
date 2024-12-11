package com.balamut.subjectserver.loadbalancer;

import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class LoadBalancerConfiguration {

    @Bean
    @LoadBalanced
    public WebClient.Builder client() {
        return WebClient.builder();
    }
}
