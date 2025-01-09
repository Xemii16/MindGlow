package com.balamut.authenticationserver.security;

import com.balamut.authenticationserver.jwt.BadTokenException;
import com.balamut.authenticationserver.jwt.JwtService;
import com.balamut.authenticationserver.user.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@Slf4j
@RequiredArgsConstructor
public class BearerAuthenticationTokenFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authorization = request.getHeader("Authorization");
        if (authorization == null) {
            log.debug("No authorization header");
            filterChain.doFilter(request, response);
            return;
        }
        String token = authorization.substring(7);
        log.trace("Token from authorization header: {}", token);
        try {
            Claims claims = jwtService.getPayload(token);
            String email = claims.getSubject();
            User user = (User) userDetailsService.loadUserByUsername(email);
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
        /*authentication.setDetails(
                new WebAuthenticationDetailsSource().buildDetails(request)
        );*/
            if (user.isEnabled() && !user.isLocked()) {
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (JwtException e) {
            log.debug("Invalid token: {}", e.getMessage());
            throw new BadTokenException("Invalid token");
        }
        filterChain.doFilter(request, response);
    }
}
