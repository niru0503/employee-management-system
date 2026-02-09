package com.example.employee_backend.service;

import com.example.employee_backend.model.User;
import com.example.employee_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User createUser(String username, String password) {
        User user = new User(username, password);
        return userRepository.save(user);
    }

    public boolean validateUser(String username, String password) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            // For demo purposes, simple password comparison
            // In production, use bcrypt or similar password hashing
            return user.get().getPassword().equals(password);
        }
        return false;
    }

    public String generateToken() {
        return UUID.randomUUID().toString();
    }
}
