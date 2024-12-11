package com.balamut.authenticationserver.user.modifier;

import com.balamut.authenticationserver.core.Modifier;
import com.balamut.authenticationserver.user.User;
import com.balamut.authenticationserver.user.request.UserRequest;
import org.springframework.stereotype.Service;

@Service
public class UserRequestModifier implements Modifier<User, UserRequest> {
    @Override
    public User modify(User entity, UserRequest modifier) {
        entity.setFirstname(modifier.firstname());
        entity.setLastname(modifier.lastname());
        entity.setLocked(modifier.locked());
        return entity;
    }
}
