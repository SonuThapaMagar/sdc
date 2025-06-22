package com.furEverHome.controller;

import com.furEverHome.dto.ForgotPasswordRequest;
import com.furEverHome.dto.LoginRequest;
import com.furEverHome.dto.OtpVerificationRequest;
import com.furEverHome.dto.ResetPasswordRequest;
import com.furEverHome.dto.SignupRequest;
import com.furEverHome.entity.PetCenter;
import com.furEverHome.entity.Role;
import com.furEverHome.entity.User;
import com.furEverHome.repository.PetCenterRepository;
import com.furEverHome.repository.UserRepository;
import com.furEverHome.service.OtpService;
import com.furEverHome.util.JwtUtil;

import java.util.UUID;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final OtpService otpservice;
    private final JwtUtil jwtUtil;
    private final PetCenterRepository petCenterRepository;

    @Autowired
    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder, OtpService otpService,
                          JwtUtil jwtUtil,PetCenterRepository petCenterRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.otpservice = otpService;
        this.jwtUtil = jwtUtil;
		this.petCenterRepository = petCenterRepository;
        System.out.println("AuthController initialized. userRepository: " + userRepository + ", passwordEncoder: "
                + passwordEncoder);
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

        // Use parameterized constructor to ensure createdAt is set
        User user = new User(
                request.getFullName(),
                request.getAddress(),
                request.getPhone(),
                request.getEmail(),
                hashedPassword,
                Role.USER
        );

        try {
            userRepository.save(user);
            return ResponseEntity.status(201).body(new SuccessResponse("User signup successful", user.getId()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ErrorResponse("Failed to save user: " + e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        if (request.getEmail() == null || request.getPassword() == null) {
            return ResponseEntity.status(400).body(new ErrorResponse("Email and password are required"));
        }

     // Check for Superadmin
        if (request.getEmail().equals("superadmin@gmail.com")) {
            if ("admin123".equals(request.getPassword())) {
                String token = jwtUtil.generateToken(request.getEmail(), Role.SUPERADMIN);
                return ResponseEntity.ok(new EnhancedLoginResponse(
                    "Superadmin login successful",
                    "superadmin-uuid",
                    token,
                    Role.SUPERADMIN.name()
                ));
            } else {
                return ResponseEntity.status(401).body(new ErrorResponse("Invalid superadmin password"));
            }
        }
        
        
     // Check for Admin (PetCenter)
        PetCenter petCenter = petCenterRepository.findByEmail(request.getEmail()).orElse(null); // Use instance
        if (petCenter != null && passwordEncoder.matches(request.getPassword(), petCenter.getPassword())) {
            String token = jwtUtil.generateToken(petCenter.getEmail(), Role.ADMIN);
            return ResponseEntity.ok(new EnhancedLoginResponse(
                "Pet Center login successful",
                petCenter.getId().toString(),
                token,
                Role.ADMIN.name() // Return role without ROLE_ prefix
            ));
        }
        
     // Check for User
        User user = userRepository.findByEmail(request.getEmail()).orElse(null);
        if (user != null && passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            String token = jwtUtil.generateToken(user.getEmail(), user.getRole());
            return ResponseEntity.ok(new EnhancedLoginResponse(
                "User login successful",
                user.getId().toString(),
                token,
                user.getRole().name()
            ));
        }
        return ResponseEntity.status(401).body(new ErrorResponse("Invalid email or password"));
        
//        User user = userRepository.findByEmail(request.getEmail()).orElse(null);
//        if (user == null || !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
//            return ResponseEntity.status(401).body(new ErrorResponse("Invalid email or password"));
//        }
//
//        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());
//        return ResponseEntity.ok(new LoginResponse("User login successful", user.getId(), token));
    }

    @PostMapping("/forgotPassword")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        User user = userRepository.findByEmail(request.getEmail()).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Email not found"));
        }

        otpservice.generateOtp(user);
        return ResponseEntity.ok(new SuccessResponse("OTP sent to your email!", user.getId()));
    }

    @PostMapping("/verifyOtp")
    public ResponseEntity<?> verifyOtp(@RequestBody OtpVerificationRequest request) {
        User user = userRepository.findByEmail(request.getEmail()).orElse(null);
        if (user == null || !otpservice.validateOtp(user, request.getOtpCode())) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Invalid or expired OTP"));
        }
        otpservice.clearOtp(user);
        return ResponseEntity.ok(new SuccessResponse("OTP verified successfully!", user.getId()));
    }

    @PostMapping("/resetPassword")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request,
                                          @RequestParam String newPassword) {
        User user = userRepository.findByEmail(request.getEmail()).orElse(null);
        if (user == null || user.getOtp() != null) {
            return ResponseEntity.badRequest().body(new ErrorResponse("User not found or OTP not cleared"));
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        return ResponseEntity.ok(new SuccessResponse("Password reset successfully!", user.getId()));
    }

    @GetMapping("/test")
    public String test() {
        return "Backend is running!";
    }

    static class SuccessResponse {
        private String message;
        private UUID id;

        public SuccessResponse(String message, UUID id) {
            this.message = message;
            this.id = id;
        }

        public String getMessage() {
            return message;
        }

        public UUID getId() {
            return id;
        }
    }

    static class LoginResponse {
        private String message;
        private UUID id;
        private String token;

        public LoginResponse(String message, UUID id, String token) {
            this.message = message;
            this.id = id;
            this.token = token;
        }

        public String getMessage() {
            return message;
        }

        public UUID getId() {
            return id;
        }

        public String getToken() {
            return token;
        }
    }

    static class ErrorResponse {
        private String message;

        public ErrorResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
 // Enhanced LoginResponse to include role
    static class EnhancedLoginResponse {
        private String message;
        private String id;
        private String token;
        private String role;

        public EnhancedLoginResponse(String message, String id, String token, String role) {
            this.message = message;
            this.id = id;
            this.token = token;
            this.role = role;
        }

        public String getMessage() {
            return message;
        }

        public String getId() {
            return id;
        }

        public String getToken() {
            return token;
        }

        public String getRole() {
            return role;
        }
    }
}