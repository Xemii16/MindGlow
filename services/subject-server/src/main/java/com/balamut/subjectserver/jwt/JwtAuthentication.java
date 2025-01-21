package com.balamut.subjectserver.jwt;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.util.Assert;

import java.util.Collection;

public class JwtAuthentication extends AbstractAuthenticationToken {

    private final JwtUser jwtUser;
    private String token;

    public JwtAuthentication(JwtUser jwtUser, String token) {
        super(null);
        this.jwtUser = jwtUser;
        this.token = token;
        setAuthenticated(false);
    }

    /**
     * This constructor should only be used by <code>AuthenticationManager</code> or
     * <code>AuthenticationProvider</code>
     * @param jwtUser
     * @param token
     * @param authorities
     */
    protected JwtAuthentication(JwtUser jwtUser, String token, Collection<? extends GrantedAuthority> authorities) {
        super(authorities);
        this.jwtUser = jwtUser;
        this.token = token;
        super.setAuthenticated(true);
    }

    public static JwtAuthentication unauthenticated(String token) {
        return new JwtAuthentication(null, token);
    }

    public static JwtAuthentication authenticated(JwtUser jwtUser, String token, Collection<? extends GrantedAuthority> authorities) {
        return new JwtAuthentication(jwtUser, token, authorities);
    }

    @Override
    public void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException {
        Assert.isTrue(!isAuthenticated,
                "Cannot set this token to trusted - use constructor which takes a GrantedAuthority list instead");
        super.setAuthenticated(false);
    }

    @Override
    public Object getCredentials() {
        return this.token;
    }

    @Override
    public Object getPrincipal() {
        return this.jwtUser;
    }
}
