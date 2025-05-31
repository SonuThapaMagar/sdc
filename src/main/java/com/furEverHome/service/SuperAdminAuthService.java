package com.furEverHome.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.furEverHome.dto.SuperAdminLoginRequest;

@Service
public class SuperAdminAuthService {

	// Static credentials
	private static final String STATIC_USERNAME = "superadmin";
	private static final String STATIC_PASSWORD = "admin123";

	public Map<String, Object> authenticate(SuperAdminLoginRequest request) {
		Map<String, Object> response = new HashMap<>();

		if (STATIC_USERNAME.equals(request.getUsername()) && STATIC_PASSWORD.equals(request.getPassword())) {
			response.put("success", true);
			response.put("token", "static-token-" + System.currentTimeMillis());
			response.put("message", "Login successful");
		} else {
			response.put("success", false);
			response.put("message", "Invalid credentials");

		}
		return response;
	}

}
