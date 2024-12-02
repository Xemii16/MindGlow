package com.balamut.authenticationserver.jwt;

import com.balamut.authenticationserver.core.KeyPairReader;
import com.balamut.authenticationserver.core.ResourceFileReader;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.security.KeyPair;

@Configuration
public class JwtConfiguration {

    @Value("${token.algorithm}")
    private String algorithm;

    @Bean
    public KeyPair keyPair() throws Exception {
        ResourceFileReader publicKeyReader = new ResourceFileReader("key.public");
        ResourceFileReader privateKeyReader = new ResourceFileReader("key.private");
        KeyPairReader keyPairReader = new KeyPairReader(algorithm, publicKeyReader, privateKeyReader);
        return keyPairReader.read();
    }
}
