package com.balamut.authenticationserver.user;

import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Integer> {
    Optional<User> findByEmail(String email);

    List<User> findAllByRole(Role role);

    List<User> findAllByRoleAndEnabled(Role role, boolean enabled);

    boolean existsByEmail(String email);

    List<User> findAllByEnabled(boolean enabled);
}
