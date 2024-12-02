package com.balamut.authenticationserver.core;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@RequiredArgsConstructor
public class ResourceFileReader implements Reader<byte[]> {

    private final String fileName;

    @Override
    public byte[] read() throws IOException {
        ClassPathResource resource = new ClassPathResource(fileName);
        Path path = resource.getFile().toPath();
        return Files.readAllBytes(path);
    }
}
