package com.furEverHome.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.furEverHome.dto.UserResponse;
import com.furEverHome.dto.UserUpdateRequest;
import com.furEverHome.entity.Role;
import com.furEverHome.service.PetCenterService;
import com.furEverHome.service.UserService;
import com.furEverHome.util.JwtUtil;

@RestController
@RequestMapping("/api/superadmin")
public class SuperAdminController {
	private final JwtUtil jwtUtil;
	private final UserService userService;
	private final PetCenterService petCenterService;

	@Autowired
	public SuperAdminController(JwtUtil jwtUtil, UserService userService, PetCenterService petCenterService) {
		this.jwtUtil = jwtUtil;
		this.userService = userService;
		this.petCenterService = petCenterService;
	}

	@GetMapping("/users")
	public ResponseEntity<?> getAllUsers(@RequestHeader("Authorization") String token) {
		if (!jwtUtil.getRoleFromToken(token.substring(7)).equals(Role.SUPERADMIN)) {
			return ResponseEntity.status(403).body(new AuthController.ErrorResponse("User must have SUPERADMIN role"));
		}
		List<UserResponse> users = userService.getAllUsers();
		return ResponseEntity.ok(users);
	}

	@PutMapping("/users/{id}")
	public ResponseEntity<?> updateUser(@RequestHeader("Authorization") String token, @PathVariable UUID id,
			@RequestBody UserUpdateRequest updateRequest) {
		if (!jwtUtil.getRoleFromToken(token.substring(7)).equals(Role.SUPERADMIN)) {
			return ResponseEntity.status(403).body(new AuthController.ErrorResponse("User must have SUPERADMIN role"));
		}
		try {
			UserResponse updatedUser = userService.updateUser(id, updateRequest);
			return ResponseEntity.ok(new SuccessResponse("User updated successfully", updatedUser));
		} catch (IllegalArgumentException | IllegalStateException e) {
			return ResponseEntity.badRequest().body(new AuthController.ErrorResponse(e.getMessage()));
		} catch (Exception e) {
			return ResponseEntity.status(500)
					.body(new AuthController.ErrorResponse("Failed to update user: " + e.getMessage()));
		}
	}

	@DeleteMapping("/users/{id}")
	public ResponseEntity<?> deleteUser(@RequestHeader("Authorization") String token,@PathVariable UUID id ){
		if (!jwtUtil.getRoleFromToken(token.substring(7)).equals(Role.SUPERADMIN)) {
            return ResponseEntity.status(403).body(new AuthController.ErrorResponse("User must have SUPERADMIN role"));
        }
		
		try {
            userService.deleteUser(id);
            return ResponseEntity.ok(new SuccessResponse("User deleted successfully", null));
        } catch (IllegalArgumentException | IllegalStateException e) {
            return ResponseEntity.badRequest().body(new AuthController.ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new AuthController.ErrorResponse("Failed to delete user: " + e.getMessage()));
        }
	}

	static class SuccessResponse {
		private String message;
		private Object data;

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
