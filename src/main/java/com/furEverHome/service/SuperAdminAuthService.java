package com.furEverHome.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.furEverHome.dto.SuperAdminLoginRequest;
import com.furEverHome.entity.Role;
import com.furEverHome.util.JwtUtil;

@Service
public class SuperAdminAuthService {

	// Static credentials
	private static final String STATIC_EMAIL = "superadmin@gmail.com";
	private static final String STATIC_PASSWORD = "admin123";

	@Autowired
	private JwtUtil jwtUtil;

	public Map<String, Object> authenticate(SuperAdminLoginRequest request) {
		Map<String, Object> response = new HashMap<>();

		if (STATIC_EMAIL.equals(request.getUsername()) && STATIC_PASSWORD.equals(request.getPassword())) {
			String token = jwtUtil.generateToken("superadmin@fureverhome.com", Role.SUPERADMIN);
			response.put("success", true);
			response.put("token", token);
			response.put("message", "Login successful");
			response.put("id", "superadmin-uuid");
		} else {
			response.put("success", false);
			response.put("message", "Invalid credentials");

		}
		return response;
	}

}
