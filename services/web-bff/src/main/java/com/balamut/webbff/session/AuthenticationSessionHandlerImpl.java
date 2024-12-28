package com.balamut.webbff.session;

import com.balamut.webbff.authentication.AuthenticationResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebSession;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.time.temporal.ChronoUnit;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthenticationSessionHandlerImpl implements AuthenticationSessionHandler {

    private static final Duration SESSION_MAX_IDLE_TIME = Duration.of(7, ChronoUnit.DAYS);

    @Override
    public Mono<Void> handle(ServerWebExchange exchange, AuthenticationResponse response) {
        return exchange.getSession().flatMap(session -> {
            if (!session.isStarted()) {
                log.debug("Session is not started, starting session");
                return createSession(session, response);
            }
            log.debug("Session is already started, changing session id");
            return session.changeSessionId();
        });
    }

    private Mono<Void> createSession(WebSession session, AuthenticationResponse response) {
        session.getAttributes().put("ACCESS_TOKEN", response.accessToken());
        session.getAttributes().put("REFRESH_TOKEN", response.refreshToken());
        session.setMaxIdleTime(SESSION_MAX_IDLE_TIME);
        session.start();
        return session.save();
    }
}
