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
    private final ResourceFileReader publicKeyReader;
    private final ResourceFileReader privateKeyReader;

    @Override
    public KeyPair read() throws Exception {
        // TODO make an adequate method
        Security.addProvider(new org.bouncycastle.jce.provider.BouncyCastleProvider());
        PemReader reader = new PemReader(new StringReader(new String(publicKeyReader.read())));
        byte[] publicKeyBytes = reader.readPemObject().getContent();
        X509EncodedKeySpec publicKeySpec = new X509EncodedKeySpec(publicKeyBytes);
        KeyFactory keyFactory = KeyFactory.getInstance(algorithm);
        PublicKey publicKey = keyFactory.generatePublic(publicKeySpec);

        PemReader reader2 = new PemReader(new StringReader(new String(privateKeyReader.read())));
        byte[] privateKeyBytes = reader2.readPemObject().getContent();
        PKCS8EncodedKeySpec privateKeySpec = new PKCS8EncodedKeySpec(privateKeyBytes);
        PrivateKey privateKey = keyFactory.generatePrivate(privateKeySpec);

        return new KeyPair(publicKey, privateKey);
    }

}