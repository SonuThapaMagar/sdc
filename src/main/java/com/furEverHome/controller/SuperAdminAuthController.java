package com.furEverHome.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.furEverHome.controller.AuthController.LoginResponse;
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
			Map<String, Object> response = authService.authenticate(request);
			if ((Boolean) response.get("success")) {
				return ResponseEntity.ok(new LoginResponse((String) response.get("message"),
						(String) response.get("id"), (String) response.get("token")));
			} else {
				return ResponseEntity.status(401)
						.body(new AuthController.ErrorResponse((String) response.get("message")));
			}
		} catch (Exception e) {
			return ResponseEntity.status(401).body(new AuthController.ErrorResponse("Invalid username or password"));
		}
	}

	static class LoginResponse {
		private String message;
		private String id;
		private String token;

		public LoginResponse(String message, String id, String token) {
			this.message = message;
			this.id = id;
			this.token = token;
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
	}

}
