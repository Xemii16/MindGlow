package com.balamut.subjectserver.subject;

import com.balamut.subjectserver.subject.entity.SubjectEntityRepository;
import com.balamut.subjectserver.subject.response.SubjectResponse;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.springframework.web.reactive.function.client.WebClient;

import static org.junit.jupiter.api.Assertions.*;

class SubjectControllerTest {

    private WebTestClient webTestClient;
    private SubjectEntityRepository subjectEntityRepository;
    private static final String BASE_PATH = "/api/v1/subjects";

    @AfterEach
    void tearDown() {
        subjectEntityRepository.deleteAll().block();
    }

    @Test
    void shouldReturnAllSubjectsFromRepository() {
        webTestClient.get().uri(BASE_PATH)
                .exchange()
                .expectStatus().isOk()
                .expectBodyList(SubjectResponse.class)
                .hasSize(subjectEntityRepository.findAll().collectList().block().size());
    }
}