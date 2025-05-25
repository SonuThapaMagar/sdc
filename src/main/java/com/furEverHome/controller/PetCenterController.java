package com.furEverHome.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.furEverHome.dto.PetRequest;
import com.furEverHome.dto.PetResponse;
import com.furEverHome.entity.Pet;
import com.furEverHome.entity.PetCenter;
import com.furEverHome.entity.Role;
import com.furEverHome.repository.PetCenterRepository;
import com.furEverHome.repository.PetRepository;
import com.furEverHome.util.JwtUtil;

@RestController
@RequestMapping("/api/admin")
public class PetCenterController {

	private final PetCenterRepository petCenterRepository;
	private final PetRepository petRepository;
	private final JwtUtil jwtUtil;

	@Autowired
	public PetCenterController(PetCenterRepository petCenterRepository, PetRepository petRepository, JwtUtil jwtUtil) {
		this.petCenterRepository = petCenterRepository;
		this.petRepository = petRepository;
		this.jwtUtil = jwtUtil;
	}

	@PostMapping("/pets")
	public ResponseEntity<?> addPet(@RequestBody PetRequest request, @RequestHeader("Authorization") String token) {

		// Extract email from the token
		String email = jwtUtil.getEmailFromToken(token.substring(7));
		PetCenter petCenter = petCenterRepository.findByEmail(email).orElse(null);

		// Validate that the user is a Pet Center Admin
		if (petCenter == null || !jwtUtil.getRoleFromToken(token.substring(7)).equals(Role.ADMIN)) {
			return ResponseEntity.status(403).body(new AuthController.ErrorResponse("Unauthorized"));
		}

		// Create a new Pet entity
		Pet pet = new Pet(request.getName(), request.getBreed(), request.getAge(), request.getGender(),
				request.getDescription(), request.getLocation(), request.getStatus(), petCenter.getId());
		petRepository.save(pet);

		return ResponseEntity.ok(new AuthController.SuccessResponse("Pet added successfully", pet.getId()));
	}

	@GetMapping("/pets")
	public ResponseEntity<?> viewPets(@RequestHeader("Authorization") String token) {
		// Extract email from the token
		String email = jwtUtil.getEmailFromToken(token.substring(7));
		PetCenter petCenter = petCenterRepository.findByEmail(email).orElse(null);

		// Validate that the user is a Pet Center Admin
		if (petCenter == null || !jwtUtil.getRoleFromToken(token.substring(7)).equals(Role.ADMIN)) {
			return ResponseEntity.status(403).body(new AuthController.ErrorResponse("Unauthorized"));
		}

		// Retrieve and map pets for this Pet Center
		List<Pet> pets = petRepository.findByCenterId(petCenter.getId());
		List<PetResponse> petResponses = pets.stream()
				.map(pet -> new PetResponse(
						pet.getId(), 
						pet.getName(), 
						pet.getBreed(), 
						pet.getAge(), 
						pet.getGender(),
						pet.getDescription(), 
						pet.getLocation(), 
						pet.getStatus(), 
						pet.getCenterId()))
				.collect(Collectors.toList());

		return ResponseEntity.ok(petResponses);
	}
}
