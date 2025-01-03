package com.balamut.webbff.core;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.security.KeyPair;

@Configuration
@RequiredArgsConstructor
public class KeyPairConfiguration {

    @Value("${RSA_PRIVATE_KEY}")
    private String privateKey;
    @Value("${RSA_PUBLIC_KEY}")
    private String publicKey;

    @Bean
    public KeyPair keyPair() throws Exception {
        return new KeyPairReader("RSA", publicKey, privateKey).read();
    }
}
