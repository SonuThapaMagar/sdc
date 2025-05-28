package com.furEverHome.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.furEverHome.dto.PetResponse;
import com.furEverHome.entity.Pet;
import com.furEverHome.entity.Role;
import com.furEverHome.repository.PetRepository;
import com.furEverHome.util.JwtUtil;

@RestController
@RequestMapping("/api/user")
public class UserController {

	private final PetRepository petRepository;
	private final JwtUtil jwtUtil;

	@Autowired
	public UserController(PetRepository petRepository, JwtUtil jwtUtil) {
		this.petRepository = petRepository;
		this.jwtUtil = jwtUtil;
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

}
