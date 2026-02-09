package com.example.employee_backend.controller;

import com.example.employee_backend.dto.ApiResponse;
import com.example.employee_backend.dto.LoginRequest;
import com.example.employee_backend.dto.LoginResponse;
import com.example.employee_backend.model.User;
import com.example.employee_backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@RequestBody LoginRequest loginRequest) {
        if (loginRequest == null || loginRequest.getUsername() == null || loginRequest.getPassword() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse<>(false, "Username and password are required", null));
        }

        String username = loginRequest.getUsername().trim();
        String password = loginRequest.getPassword();

        if (authService.validateUser(username, password)) {
            Optional<User> user = authService.findByUsername(username);
            if (user.isPresent()) {
                String token = authService.generateToken();
                LoginResponse loginResponse = new LoginResponse(token, username, user.get().getId());
                return ResponseEntity.ok(new ApiResponse<>(true, "Login successful", loginResponse));
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new ApiResponse<>(false, "Invalid username or password", null));
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<User>> register(@RequestBody LoginRequest loginRequest) {
        Optional<User> existingUser = authService.findByUsername(loginRequest.getUsername());
        if (existingUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse<>(false, "Username already exists", null));
        }

        User newUser = authService.createUser(loginRequest.getUsername(), loginRequest.getPassword());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>(true, "User registered successfully", newUser));
    }
}
