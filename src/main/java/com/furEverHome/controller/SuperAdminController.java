package com.furEverHome.controller;

import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.furEverHome.dto.AdminProfileResponse;
import com.furEverHome.dto.AdminProfileUpdateRequest;
import com.furEverHome.dto.PetResponse;
import com.furEverHome.dto.UserResponse;
import com.furEverHome.dto.UserUpdateRequest;
import com.furEverHome.entity.PetCenter;
import com.furEverHome.entity.Role;
import com.furEverHome.service.PetCenterService;
import com.furEverHome.service.PetService;
import com.furEverHome.service.UserService;
import com.furEverHome.util.JwtUtil;

@RestController
@RequestMapping("/api/superadmin")
public class SuperAdminController {
	private final JwtUtil jwtUtil;
	private final UserService userService;
	private final PetCenterService petCenterService;
	private final PetService petService;

	@Autowired
	public SuperAdminController(JwtUtil jwtUtil, UserService userService, PetCenterService petCenterService,
			PetService petService) {
		this.jwtUtil = jwtUtil;
		this.userService = userService;
		this.petCenterService = petCenterService;
		this.petService = petService;
	}

	@GetMapping("/users")
	public ResponseEntity<?> getAllUsers(@RequestHeader("Authorization") String token) {
		if (!jwtUtil.getRoleFromToken(token.substring(7)).equals(Role.SUPERADMIN)) {
			return ResponseEntity.status(403).body(new AuthController.ErrorResponse("User must have SUPERADMIN role"));
		}
		List<UserResponse> users = userService.getAllUsers();
		return ResponseEntity.ok(users);
	}

	@GetMapping("/users/{id}")
	public ResponseEntity<?> getUserById(@RequestHeader("Authorization") String token, @PathVariable UUID id) {
		if (!jwtUtil.getRoleFromToken(token.substring(7)).equals(Role.SUPERADMIN)) {
			return ResponseEntity.status(403).body(new AuthController.ErrorResponse("User must have SUPERADMIN role"));
		}
		try {
			UserResponse user = userService.getUserById(id);
			return ResponseEntity.ok(user);
		} catch (IllegalArgumentException e) {
			return ResponseEntity.badRequest().body(new AuthController.ErrorResponse(e.getMessage()));
		} catch (Exception e) {
			return ResponseEntity.status(500)
					.body(new AuthController.ErrorResponse("Failed to fetch user: " + e.getMessage()));
		}
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
	public ResponseEntity<?> deleteUser(@RequestHeader("Authorization") String token, @PathVariable UUID id) {
		if (!jwtUtil.getRoleFromToken(token.substring(7)).equals(Role.SUPERADMIN)) {
			return ResponseEntity.status(403).body(new AuthController.ErrorResponse("User must have SUPERADMIN role"));
		}
		try {
			userService.deleteUser(id);
			return ResponseEntity.ok(new SuccessResponse("User deleted successfully", null));
		} catch (IllegalArgumentException | IllegalStateException e) {
			return ResponseEntity.badRequest().body(new AuthController.ErrorResponse(e.getMessage()));
		} catch (Exception e) {
			return ResponseEntity.status(500)
					.body(new AuthController.ErrorResponse("Failed to delete user: " + e.getMessage()));
		}
	}

	@GetMapping("/pet-centers")
	public ResponseEntity<?> getAllPetCenters(@RequestHeader("Authorization") String token) {
		if (!jwtUtil.getRoleFromToken(token.substring(7)).equals(Role.SUPERADMIN)) {
			return ResponseEntity.status(403).body(new AuthController.ErrorResponse("User must have SUPERADMIN role"));
		}
		List<AdminProfileResponse> petCenters = petCenterService.getAllPetCenters();
		return ResponseEntity.ok(petCenters);
	}

	@GetMapping("/pet-centers/{id}")
	public ResponseEntity<?> getPetCenterById(@RequestHeader("Authorization") String token, @PathVariable UUID id) {
		if (!jwtUtil.getRoleFromToken(token.substring(7)).equals(Role.SUPERADMIN)) {
			return ResponseEntity.status(403).body(new AuthController.ErrorResponse("User must have SUPERADMIN role"));
		}
		try {
			PetCenter petCenter = petCenterService.getPetCenterById(id);
			AdminProfileResponse response = mapToAdminProfileResponse(petCenter);
			return ResponseEntity.ok(response);
		} catch (IllegalArgumentException e) {
			return ResponseEntity.badRequest().body(new AuthController.ErrorResponse(e.getMessage()));
		} catch (Exception e) {
			return ResponseEntity.status(500)
					.body(new AuthController.ErrorResponse("Failed to fetch pet center: " + e.getMessage()));
		}
	}

	@PutMapping("/pet-centers/{id}")
	public ResponseEntity<?> updatePetCenter(@RequestHeader("Authorization") String token, @PathVariable UUID id,
			@RequestBody AdminProfileUpdateRequest updateRequest) {
		if (!jwtUtil.getRoleFromToken(token.substring(7)).equals(Role.SUPERADMIN)) {
			return ResponseEntity.status(403).body(new AuthController.ErrorResponse("User must have SUPERADMIN role"));
		}
		try {
			AdminProfileResponse updatedPetCenter = petCenterService.updatePetCenter(id, updateRequest);
			return ResponseEntity.ok(new SuccessResponse("Pet Center updated successfully", updatedPetCenter));
		} catch (IllegalArgumentException | IllegalStateException e) {
			return ResponseEntity.badRequest().body(new AuthController.ErrorResponse(e.getMessage()));
		} catch (Exception e) {
			return ResponseEntity.status(500)
					.body(new AuthController.ErrorResponse("Failed to update pet center: " + e.getMessage()));
		}
	}

	@DeleteMapping("/pet-centers/{id}")
	public ResponseEntity<?> deletePetCenter(@RequestHeader("Authorization") String token, @PathVariable UUID id) {
		if (!jwtUtil.getRoleFromToken(token.substring(7)).equals(Role.SUPERADMIN)) {
			return ResponseEntity.status(403).body(new AuthController.ErrorResponse("User must have SUPERADMIN role"));
		}
		try {
			petCenterService.deletePetCenter(id);
			return ResponseEntity.ok(new SuccessResponse("Pet Center deleted successfully", null));
		} catch (IllegalArgumentException | IllegalStateException e) {
			return ResponseEntity.badRequest().body(new AuthController.ErrorResponse(e.getMessage()));
		} catch (Exception e) {
			return ResponseEntity.status(500)
					.body(new AuthController.ErrorResponse("Failed to delete pet center: " + e.getMessage()));
		}
	}
	
	@GetMapping("/pets")
    public ResponseEntity<?> getAllPets(@RequestHeader("Authorization") String token) {
        if (!jwtUtil.getRoleFromToken(token.substring(7)).equals(Role.SUPERADMIN)) {
            return ResponseEntity.status(403).body(new AuthController.ErrorResponse("User must have SUPERADMIN role"));
        }
        try {
            List<PetResponse> pets = petService.getAllPets();
            return ResponseEntity.ok(pets);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new AuthController.ErrorResponse("Failed to fetch pets: " + e.getMessage()));
        }
    }	
	
	@DeleteMapping("/pets/{id}")
    public ResponseEntity<?> deletePet(@RequestHeader("Authorization") String token, @PathVariable UUID id) {
        if (!jwtUtil.getRoleFromToken(token.substring(7)).equals(Role.SUPERADMIN)) {
            return ResponseEntity.status(403).body(new AuthController.ErrorResponse("User must have SUPERADMIN role"));
        }
        try {
            petService.deletePet(id);
            return ResponseEntity.ok(new SuccessResponse("Pet deleted successfully", null));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new AuthController.ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new AuthController.ErrorResponse("Failed to delete pet: " + e.getMessage()));
        }
    }
	

	private AdminProfileResponse mapToAdminProfileResponse(PetCenter petCenter) {
		AdminProfileResponse response = new AdminProfileResponse();
		response.setId(petCenter.getId());
		response.setShelterName(petCenter.getShelterName());
		response.setAddress(petCenter.getAddress());
		response.setPhone(petCenter.getPhone());
		response.setDescription(petCenter.getDescription());
		response.setEmail(petCenter.getEmail());
		return response;
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