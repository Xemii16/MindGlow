package com.balamut.authenticationserver.core;

import lombok.RequiredArgsConstructor;
import org.bouncycastle.util.io.pem.PemReader;

import java.io.StringReader;
import java.security.*;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;

@RequiredArgsConstructor
public class KeyPairReader implements Reader<KeyPair> {

    private final String algorithm;
    private final String publicKey;
    private final String privateKey;

    @Override
    public KeyPair read() throws Exception {
        Security.addProvider(new org.bouncycastle.jce.provider.BouncyCastleProvider());
        PemReader reader = new PemReader(new StringReader(publicKey));
        byte[] publicKeyBytes = reader.readPemObject().getContent();
        X509EncodedKeySpec publicKeySpec = new X509EncodedKeySpec(publicKeyBytes);
        KeyFactory keyFactory = KeyFactory.getInstance(algorithm);
        PublicKey publicKey = keyFactory.generatePublic(publicKeySpec);

        PemReader reader2 = new PemReader(new StringReader(privateKey));
        byte[] privateKeyBytes = reader2.readPemObject().getContent();
        PKCS8EncodedKeySpec privateKeySpec = new PKCS8EncodedKeySpec(privateKeyBytes);
        PrivateKey privateKey = keyFactory.generatePrivate(privateKeySpec);

        return new KeyPair(publicKey, privateKey);
    }

}