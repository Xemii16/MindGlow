package com.balamut.authenticationserver.user.mapper;

import com.balamut.authenticationserver.core.Mapper;
import com.balamut.authenticationserver.user.User;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class UserJwtMapper implements Mapper<User, JwtBuilder> {
    @Override
    public JwtBuilder map(User user) {
        String authorities = Arrays.toString(
                user.getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority)
                        .toList()
                        .toArray(String[]::new)
        ).replace("[", "").replace("]", "");
        return Jwts.builder()
                .claim("locked", user.isLocked())
                .claim("enabled", user.isEnabled())
                .claim("authorities", authorities
                )
                .subject(user.getId().toString());
    }
}
