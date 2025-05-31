package com.furEverHome.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.furEverHome.dto.AdminProfileResponse;
import com.furEverHome.dto.AdminProfileUpdateRequest;
import com.furEverHome.dto.AdoptionRequestResponse;
import com.furEverHome.dto.AdoptionRequestStatusUpdate;
import com.furEverHome.entity.Role;
import com.furEverHome.service.AdoptionRequestService;
import com.furEverHome.service.PetCenterService;
import com.furEverHome.util.JwtUtil;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

	private final JwtUtil jwtUtil;
	private final AdoptionRequestService adoptionRequestService;
	private final PetCenterService petCenterService;

	@Autowired
	public AdminController(JwtUtil jwtUtil, AdoptionRequestService adoptionRequestService,
			PetCenterService petCenterService) {
		this.jwtUtil = jwtUtil;
		this.adoptionRequestService = adoptionRequestService;
		this.petCenterService = petCenterService;
	}

	@GetMapping("/adoption-requests")
	public ResponseEntity<?> getAllAdoptionRequests(@RequestHeader("Authorization") String token) {
		String tokenValue = token.substring(7); // Remove "Bearer " prefix
		if (!jwtUtil.getRoleFromToken(tokenValue).equals(Role.ADMIN)) {
			return ResponseEntity.status(403)
					.body(new AuthController.ErrorResponse("User must have ADMIN role to view adoption requests"));
		}

		List<AdoptionRequestResponse> requests = adoptionRequestService.getAllAdoptionRequests();
		return ResponseEntity.ok(requests);
	}

	@PutMapping("/adoption-request/{id}/status")
	public ResponseEntity<?> updateAdoptionRequestStatus(@RequestHeader("Authorization") String token,
			@PathVariable UUID id, @RequestBody AdoptionRequestStatusUpdate updateDTO) {
		String tokenValue = token.substring(7); // Remove "Bearer " prefix
		System.out.println("Controller received token: " + tokenValue);
		try {
			Role role = jwtUtil.getRoleFromToken(tokenValue);
			System.out.println("Extracted role from token: " + role);
			if (role == null) {
				System.out.println("Role is null");
				return ResponseEntity.status(403)
						.body(new AuthController.ErrorResponse("Role is null, ADMIN role required"));
			}
			if (!role.equals(Role.ADMIN)) {
				System.out.println("Role check failed: " + role + " is not ADMIN");
				return ResponseEntity.status(403).body(
						new AuthController.ErrorResponse("User must have ADMIN role to update adoption requests"));
			}
			try {
				AdoptionRequestResponse responseDTO = adoptionRequestService.updateAdoptionRequestStatus(id, updateDTO);
				return ResponseEntity
						.ok(new SuccessResponse("Adoption request status updated successfully", responseDTO));
			} catch (IllegalArgumentException | IllegalStateException e) {
				return ResponseEntity.badRequest().body(new AuthController.ErrorResponse(e.getMessage()));
			} catch (Exception e) {
				return ResponseEntity.status(500)
						.body(new AuthController.ErrorResponse("Failed to update adoption request: " + e.getMessage()));
			}
		} catch (Exception e) {
			System.out.println("Exception while extracting role: " + e.getMessage());
			return ResponseEntity.status(403)
					.body(new AuthController.ErrorResponse("Invalid token: " + e.getMessage()));
		}
	}

	@PutMapping("/profile")
	public ResponseEntity<?> updateAdminProfile(@RequestHeader("Authorization") String token,
			@RequestBody AdminProfileUpdateRequest updateRequest) {
		String tokenValue = token.substring(7); // Remove "Bearer " prefix
		if (!jwtUtil.getRoleFromToken(tokenValue).equals(Role.ADMIN)) {
			return ResponseEntity.status(403)
					.body(new AuthController.ErrorResponse("User must have ADMIN role to update profile"));
		}

		try {
			String email = jwtUtil.getEmailFromToken(tokenValue);
			AdminProfileResponse updatedProfile = petCenterService.updatePetCenterProfile(email, updateRequest);
			return ResponseEntity.ok(new SuccessResponse("Admin profile updated successfully", updatedProfile));
		} catch (IllegalArgumentException | IllegalStateException e) {
			return ResponseEntity.badRequest().body(new AuthController.ErrorResponse(e.getMessage()));
		} catch (Exception e) {
			return ResponseEntity.status(500)
					.body(new AuthController.ErrorResponse("Failed to update admin profile: " + e.getMessage()));
		}
	}

	static class SuccessResponse {
		private String message;
		private Object data; // Use Object to handle different response types

		public SuccessResponse(String message, Object data) {
			this.message = message;
			this.data = data;
		}

		public String getMessage() {
			return message;
		}

		public Object getData() {
			return data;
		}
	}
}
