package com.furEverHome.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.furEverHome.dto.AdoptionRequestResponse;
import com.furEverHome.dto.AdoptionRequestSubmission;
import com.furEverHome.dto.PetResponse;
import com.furEverHome.dto.ProfileResponse;
import com.furEverHome.dto.ProfileUpdateRequest;
import com.furEverHome.entity.Pet;
import com.furEverHome.entity.Role;
import com.furEverHome.repository.PetRepository;
import com.furEverHome.service.AdoptionRequestService;
import com.furEverHome.service.UserService;
import com.furEverHome.util.JwtUtil;

@RestController
@RequestMapping("/api/user")
public class UserController {

	private final PetRepository petRepository;
	private final JwtUtil jwtUtil;
	private final AdoptionRequestService adoptionRequestService;
	private final UserService userService;

	@Autowired
	public UserController(PetRepository petRepository, JwtUtil jwtUtil, AdoptionRequestService adoptionRequestService,
			UserService userService) {
		this.petRepository = petRepository;
		this.jwtUtil = jwtUtil;
		this.adoptionRequestService = adoptionRequestService;
		this.userService = userService;
	}

	@GetMapping("/pets")
	public ResponseEntity<?> viewPets(@RequestHeader("Authorization") String token) {

		String email = jwtUtil.getEmailFromToken(token.substring(7));
		if (!jwtUtil.getRoleFromToken(token.substring(7)).equals(Role.USER)) {
			return ResponseEntity.status(403)
					.body(new AuthController.ErrorResponse("User must have USER role to view pets"));
		}

		List<Pet> pets = petRepository.findAll().stream().filter(pet -> pet.getStatus().equals("AVAILABLE"))
				.collect(Collectors.toList());
		List<PetResponse> petResponses = pets.stream()
				.map(pet -> new PetResponse(pet.getId(), pet.getName(), pet.getBreed(), pet.getAge(), pet.getGender(),
						pet.getDescription(), pet.getLocation(), pet.getStatus(), pet.getCenterId()))
				.collect(Collectors.toList());
		return ResponseEntity.ok(petResponses);
	}

	@GetMapping("/pets/search")
	public ResponseEntity<?> searchPets(@RequestParam String query, @RequestParam String location,
			@RequestHeader("Authorization") String token) {
		String email = jwtUtil.getEmailFromToken(token.substring(7));
		if (!jwtUtil.getRoleFromToken(token.substring(7)).equals(Role.USER)) {
			return ResponseEntity.status(403)
					.body(new AuthController.ErrorResponse("User must have USER role to search pets"));
		}

		List<Pet> pets = petRepository.findAll().stream()
				.filter(pet -> pet.getName().toLowerCase().contains(query.toLowerCase())
						&& pet.getLocation().toLowerCase().contains(location.toLowerCase())
						&& pet.getStatus().equals("AVAILABLE"))
				.collect(Collectors.toList());

		List<PetResponse> petResponses = pets.stream()
				.map(pet -> new PetResponse(pet.getId(), pet.getName(), pet.getBreed(), pet.getAge(), pet.getGender(),
						pet.getDescription(), pet.getLocation(), pet.getStatus(), pet.getCenterId()))
				.collect(Collectors.toList());
		return ResponseEntity.ok(petResponses);
	}

	@PostMapping("/adoption-request")
	public ResponseEntity<?> submitAdoptionRequest(@RequestHeader("Authorization") String token,
			@RequestBody AdoptionRequestSubmission requestDTO) {
		String email = jwtUtil.getEmailFromToken(token.substring(7));
		if (!jwtUtil.getRoleFromToken(token.substring(7)).equals(Role.USER)) {
			return ResponseEntity.status(403)
					.body(new AuthController.ErrorResponse("User must have USER role to submit an adoption request"));
		}

		try {
			AdoptionRequestResponse responseDTO = adoptionRequestService.submitAdoptionRequest(email, requestDTO);
			return ResponseEntity.status(201)
					.body(new SuccessResponse("Adoption request submitted successfully", responseDTO));
		} catch (IllegalArgumentException | IllegalStateException e) {
			return ResponseEntity.badRequest().body(new AuthController.ErrorResponse(e.getMessage()));
		} catch (Exception e) {
			return ResponseEntity.status(500)
					.body(new AuthController.ErrorResponse("Failed to submit adoption request: " + e.getMessage()));
		}
	}

	@PutMapping("/profile")
	public ResponseEntity<?> updateProfile(@RequestHeader("Authorization") String token,
			@RequestBody ProfileUpdateRequest updateRequest) {

		String tokenValue = token.substring(7); // Remove "Bearer " prefix
		if (!jwtUtil.getRoleFromToken(tokenValue).equals(Role.USER)) {
			return ResponseEntity.status(403)
					.body(new AuthController.ErrorResponse("User must have USER role to update profile"));
		}

		try {
			String email = jwtUtil.getEmailFromToken(tokenValue);
			ProfileResponse updatedProfile = userService.updateUserProfile(email, updateRequest, Role.USER);
			return ResponseEntity.ok(new SuccessResponse("Profile updated successfully", updatedProfile));
		} catch (IllegalArgumentException | IllegalStateException e) {
			return ResponseEntity.badRequest().body(new AuthController.ErrorResponse(e.getMessage()));
		} catch (Exception e) {
			return ResponseEntity.status(500)
					.body(new AuthController.ErrorResponse("Failed to update profile: " + e.getMessage()));
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
