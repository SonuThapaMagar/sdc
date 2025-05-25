package com.furEverHome.controller;

import com.furEverHome.dto.ForgotPasswordRequest;
import com.furEverHome.dto.LoginRequest;
import com.furEverHome.dto.OtpVerificationRequest;
import com.furEverHome.dto.ResetPasswordRequest;
import com.furEverHome.dto.SignupRequest;
import com.furEverHome.entity.Role;
import com.furEverHome.entity.User;
import com.furEverHome.repository.UserRepository;
import com.furEverHome.service.OtpService;
import com.furEverHome.util.JwtUtil;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth/")
public class AuthController {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final OtpService otpservice;
	private final JwtUtil jwtUtil;

	@Autowired
	public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder, OtpService otpService,
			JwtUtil jwtUtil) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.otpservice = otpService;
		this.jwtUtil = jwtUtil;
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

		User user = new User();
		user.setFullName(request.getFullName());
		user.setAddress(request.getAddress());
		user.setPhone(request.getPhone());
		user.setEmail(request.getEmail());
		user.setPassword(hashedPassword);
		user.setRole(request.getFullName().equals("admin") ? Role.ADMIN : Role.USER);
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

		// generate JWT Token
		String token = jwtUtil.generateToken(user.getEmail(), user.getRole());
		System.out.println("Login successful for email: " + user.getEmail() + ", Token: " + token);
		return ResponseEntity.ok(new LoginResponse("Login successful!", user.getId(), token));
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
	public ResponseEntity<?> resetPassword(@RequestBody OtpVerificationRequest request) {

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
			return ResponseEntity.badRequest().body(new ErrorResponse("User not found"));
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
		private UUID userId;

		public SuccessResponse(String message, UUID userId) {
			this.message = message;
			this.userId = userId;
		}

		public String getMessage() {
			return message;
		}

		public void setMessage(String message) {
			this.message = message;
		}

		public UUID getUserId() {
			return userId;
		}

		public void setUserId(UUID userId) {
			this.userId = userId;
		}
	}

	static class LoginResponse {
		private String message;
		private UUID userId;
		private String token;

		public LoginResponse(String message, UUID userId, String token) {
			this.message = message;
			this.userId = userId;
			this.token = token;
		}

		public String getMessage() {
			return message;
		}

		public void setMessage(String message) {
			this.message = message;
		}

		public UUID getUserId() {
			return userId;
		}

		public void setUserId(UUID userId) {
			this.userId = userId;
		}

		public String getToken() {
			return token;
		}

		public void setToken(String token) {
			this.token = token;
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
}