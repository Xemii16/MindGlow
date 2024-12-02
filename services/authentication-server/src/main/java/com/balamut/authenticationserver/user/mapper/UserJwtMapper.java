package com.balamut.authenticationserver.user.mapper;

import com.balamut.authenticationserver.core.Mapper;
import com.balamut.authenticationserver.user.User;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Service;

@Service
public class UserJwtMapper implements Mapper<User, JwtBuilder> {
    @Override
    public JwtBuilder map(User user) {
        return Jwts.builder()
                .subject(user.getEmail());
    }
}
