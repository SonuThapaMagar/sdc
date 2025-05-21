package com.furEverHome.controller;

import com.furEverHome.dto.LoginRequest;
import com.furEverHome.dto.SignupRequest;
import com.furEverHome.entity.User;
import com.furEverHome.repository.UserRepository;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        System.out.println("AuthController initialized. userRepository: " + userRepository + ", passwordEncoder: " + passwordEncoder);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
        System.out.println("Received signup request: " + request);
        if (request.getEmail() == null || request.getEmail().isEmpty()) {
            System.out.println("Email validation failed");
            return ResponseEntity.badRequest().body(new ErrorResponse("Email is required"));
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            System.out.println("Email already exists: " + request.getEmail());
            return ResponseEntity.badRequest().body(new ErrorResponse("Email already exists"));
        }

        String rawPassword = request.getPassword();
        System.out.println("Raw Password: " + rawPassword);
        String hashedPassword = passwordEncoder.encode(rawPassword);
        System.out.println("Hashed Password: " + hashedPassword);

        User user = new User();
        System.out.println("Generated User ID before save: " + user.getId());

        try {
            userRepository.save(user);
            System.out.println("User saved: " + user.getEmail() + ", ID: " + user.getId());
            return ResponseEntity.ok(new SuccessResponse("Signup successful!", user.getId()));
        } catch (Exception e) {
            System.err.println("Error saving user: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body(new ErrorResponse("Failed to save user: " + e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        if (request.getEmail() == null || request.getPassword() == null) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Email and password are required"));
        }

        User user = userRepository.findByEmail(request.getEmail()).orElse(null);

        if (user == null || !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            System.out.println("Login failed for email: " + request.getEmail());
            return ResponseEntity.status(401).body(new ErrorResponse("Invalid email or password"));
        }

        System.out.println("Login successful for email: " + user.getEmail());
        return ResponseEntity.ok(new SuccessResponse("Login successful!", user.getId()));
    }

    @GetMapping("/test")
    public String test() {
        return "Backend is running!";
    }

    static class SuccessResponse {
        private String message;
        private UUID userId;

        public SuccessResponse(String message, UUID userId) {
            this.message = message;
            this.userId = userId;
        }

        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
        public UUID getUserId() { return userId; }
        public void setUserId(UUID userId) { this.userId = userId; }
    }

    static class ErrorResponse {
        private String message;
        public ErrorResponse(String message) { this.message = message; }
        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
    }
}