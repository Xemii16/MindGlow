package com.balamut.authenticationserver.authentication;

import com.balamut.authenticationserver.authentication.response.AuthenticationResponse;
import com.balamut.authenticationserver.user.exception.UserException;

public interface AuthenticationService {

    AuthenticationResponse authenticate(String email, String password) throws UserException;
}
