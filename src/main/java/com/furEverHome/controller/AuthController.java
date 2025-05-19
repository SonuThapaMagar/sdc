package com.furEverHome.controller;

import com.furEverHome.dto.SignupRequest;
import com.furEverHome.entity.User;
import com.furEverHome.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {

    private final UserRepository userRepository;

    @Autowired
    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
       
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
        // Validate input
        if (request.getEmail() == null || request.getEmail().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse("Email is required"));
        }

        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse("Email already exists"));
        }

        // Create new user with hashed password
        User user = new User(
                request.getFullName(),
                request.getAddress(),
                request.getPhone(),
                request.getEmail(),
                request.getPassword()
        );
        System.out.println("Generated User ID before save: " + user.getId());
        // Save user to database
        try {
            userRepository.save(user);
            System.out.println("User saved: " + user.getEmail() + ", ID: " + user.getId());
            } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(new ErrorResponse("Failed to save user: " + e.getMessage()));
        }

        return ResponseEntity.ok(new SuccessResponse("Signup successful!"));
    }
    
    @GetMapping("/test")
    public String test() {
        return "Backend is running!";
    }

    static class SuccessResponse {
        private String message;
        public SuccessResponse(String message) { this.message = message; }
        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
    }

    static class ErrorResponse {
        private String message;
        public ErrorResponse(String message) { this.message = message; }
        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
    }
}