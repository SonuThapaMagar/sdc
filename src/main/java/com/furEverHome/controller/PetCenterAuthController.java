package com.furEverHome.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.furEverHome.dto.PetCenterSignupRequest;
import com.furEverHome.entity.PetCenter;
import com.furEverHome.repository.PetCenterRepository;
import com.furEverHome.util.JwtUtil;

@RestController
@RequestMapping("/api/admin/auth")
public class PetCenterAuthController {

	private final PetCenterRepository petCenterRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtUtil jwtUtil;

	@Autowired
	public PetCenterAuthController(PetCenterRepository petCenterRepository, PasswordEncoder passwordEncoder,
			JwtUtil jwtUtil) {
		this.petCenterRepository = petCenterRepository;
		this.passwordEncoder = passwordEncoder;
		this.jwtUtil = jwtUtil;
	}

	@PostMapping("/signup")
	public ResponseEntity<?> signup(@RequestBody PetCenterSignupRequest request) {

		if (request.getEmail() == null || request.getEmail().isEmpty()) {
			return ResponseEntity.badRequest().body(new AuthController.ErrorResponse("Email is required"));
		}

		if (petCenterRepository.existsByEmail(request.getEmail())) {
			return ResponseEntity.badRequest().body(new AuthController.ErrorResponse("Email already exists"));
		}

		String hashedPassword = passwordEncoder.encode(request.getPassword());
		PetCenter petCenter = new PetCenter(
                request.getName(),
                request.getAddress(),
                request.getContactInfo(),
                request.getDescription(),
                request.getEmail(),
                hashedPassword
        );
        petCenterRepository.save(petCenter);

		return ResponseEntity.ok(new AuthController.SuccessResponse("Pet Center signup successful", petCenter.getId()));
	}

}
