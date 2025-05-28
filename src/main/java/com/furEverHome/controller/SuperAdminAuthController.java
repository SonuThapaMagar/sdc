package com.furEverHome.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.furEverHome.dto.SuperAdminLoginRequest;
import com.furEverHome.service.SuperAdminAuthService;

@RestController
@RequestMapping("/api/superadmin/auth")
public class SuperAdminAuthController {
	@Autowired
	private SuperAdminAuthService authService;

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody SuperAdminLoginRequest request) {
		try {
			return ResponseEntity.ok(authService.authenticate(request));
		} catch (Exception e) {
			return ResponseEntity.status(401).body(new AuthController.ErrorResponse("Invalid username or password"));
		}
	}

}
