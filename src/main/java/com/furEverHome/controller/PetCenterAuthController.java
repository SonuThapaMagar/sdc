package com.furEverHome.controller;

import java.time.Year;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.furEverHome.dto.LoginRequest;
import com.furEverHome.dto.PetCenterSignupRequest;
import com.furEverHome.entity.PetCenter;
import com.furEverHome.entity.Role;
import com.furEverHome.repository.PetCenterRepository;
import com.furEverHome.service.FileStorageService;
import com.furEverHome.util.JwtUtil;

@RestController
@RequestMapping("/api/admin/auth")
public class PetCenterAuthController {

	private final PetCenterRepository petCenterRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtUtil jwtUtil;
	private final FileStorageService fileStorageService;

	@Autowired
	public PetCenterAuthController(PetCenterRepository petCenterRepository, PasswordEncoder passwordEncoder,
			JwtUtil jwtUtil, FileStorageService fileStorageService) {
		this.petCenterRepository = petCenterRepository;
		this.passwordEncoder = passwordEncoder;
		this.jwtUtil = jwtUtil;
		this.fileStorageService = fileStorageService;
	}

	@PostMapping(value = "/signup", consumes = { "multipart/form-data" })
	public ResponseEntity<?> signup(@ModelAttribute PetCenterSignupRequest request,
			@RequestPart(value = "license", required = true) MultipartFile license,
			@RequestPart(value = "insurance", required = true) MultipartFile insurance,
			@RequestPart(value = "taxExempt", required = false) MultipartFile taxExempt) {
		System.out.println("Received signup request for email: " + request.getEmail());

		// Set the files in the request object
		request.setLicense(license);
		request.setInsurance(insurance);
		request.setTaxExempt(taxExempt);

		// Validate Required Fields
		if (request.getShelterName() == null || request.getShelterName().trim().isEmpty()) {
			return ResponseEntity.status(400).body(new AuthController.ErrorResponse("Shelter name is required"));
		}
		if (request.getContactPerson() == null || request.getContactPerson().trim().isEmpty()) {
			return ResponseEntity.status(400).body(new AuthController.ErrorResponse("Contact person is required"));
		}
		if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
			return ResponseEntity.status(400).body(new AuthController.ErrorResponse("Email is required"));
		}
		if (request.getPhone() == null || request.getPhone().trim().isEmpty()) {
			return ResponseEntity.status(400).body(new AuthController.ErrorResponse("Phone number is required"));
		}
		if (request.getAddress() == null || request.getAddress().trim().isEmpty()) {
			return ResponseEntity.status(400).body(new AuthController.ErrorResponse("Address is required"));
		}
		if (request.getCity() == null || request.getCity().trim().isEmpty()) {
			return ResponseEntity.status(400).body(new AuthController.ErrorResponse("City is required"));
		}
		if (request.getState() == null || request.getState().trim().isEmpty()) {
			return ResponseEntity.status(400).body(new AuthController.ErrorResponse("State is required"));
		}
		if (request.getZipCode() == null || request.getZipCode().trim().isEmpty()
				|| request.getZipCode().length() < 3) {
			return ResponseEntity.status(400)
					.body(new AuthController.ErrorResponse("Valid ZIP/Postal code is required"));
		}
		if (request.getOrganizationType() == null || request.getOrganizationType().trim().isEmpty()) {
			return ResponseEntity.status(400).body(new AuthController.ErrorResponse("Organization type is required"));
		}
		if (request.getYearEstablished() == null || request.getYearEstablished() < 1900
				|| request.getYearEstablished() > Year.now().getValue()) {
			return ResponseEntity.status(400).body(new AuthController.ErrorResponse(
					"Valid year established is required (1900-" + Year.now().getValue() + ")"));
		}
		if (request.getDescription() == null || request.getDescription().trim().isEmpty()) {
			return ResponseEntity.status(400).body(new AuthController.ErrorResponse("Description is required"));
		}
		if (request.getCapacity() == null || request.getCapacity() <= 0) {
			return ResponseEntity.status(400).body(new AuthController.ErrorResponse("Valid capacity is required"));
		}
		if (request.getAnimalsCurrently() == null || request.getAnimalsCurrently() < 0
				|| request.getAnimalsCurrently() > request.getCapacity()) {
			return ResponseEntity.status(400)
					.body(new AuthController.ErrorResponse("Valid number of current animals is required (≤ capacity)"));
		}
		if (request.getServicesOffered() == null || request.getServicesOffered().isEmpty()) {
			return ResponseEntity.status(400)
					.body(new AuthController.ErrorResponse("At least one service must be selected"));
		}
		if (request.getPassword() == null || request.getPassword().trim().isEmpty()) {
			return ResponseEntity.status(400).body(new AuthController.ErrorResponse("Password is required"));
		}

		// Validate Email Format
		String emailRegex = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$";
		if (!Pattern.matches(emailRegex, request.getEmail())) {
			return ResponseEntity.status(400).body(new AuthController.ErrorResponse("Invalid email format"));
		}

		// Validate Phone Format
		String phoneRegex = "^[+]?[1-9][\\d]{0,15}$";
		if (!Pattern.matches(phoneRegex, request.getPhone().replaceAll("[\\s-]", ""))) {
			return ResponseEntity.status(400).body(new AuthController.ErrorResponse("Invalid phone number format"));
		}

		// Validate Website (if provided)
		if (request.getWebsite() != null && !request.getWebsite().trim().isEmpty()) {
			String urlRegex = "^https?://.+\\..+";
			if (!Pattern.matches(urlRegex, request.getWebsite())) {
				return ResponseEntity.status(400)
						.body(new AuthController.ErrorResponse("Invalid website URL (include http:// or https://)"));
			}
		}

		// Check if Email Exists
		if (petCenterRepository.existsByEmail(request.getEmail())) {
			return ResponseEntity.status(409).body(new AuthController.ErrorResponse("Email already exists"));
		}

		// Validate File Uploads
		long maxSize = 10 * 1024 * 1024; // 10MB
		String[] allowedTypes = { "application/pdf", "application/msword",
				"application/vnd.openxmlformats-officedocument.wordprocessingml.document", "image/jpeg", "image/png" };

		if (license.isEmpty()) {
			return ResponseEntity.status(400).body(new AuthController.ErrorResponse("Operating license is required"));
		}
		if (license.getSize() > maxSize) {
			return ResponseEntity.status(400)
					.body(new AuthController.ErrorResponse("License file size must be less than 10MB"));
		}
		if (!isAllowedFileType(license.getContentType(), allowedTypes)) {
			return ResponseEntity.status(400)
					.body(new AuthController.ErrorResponse("License must be a PDF, Word document, or image file"));
		}

		if (insurance.isEmpty()) {
			return ResponseEntity.status(400)
					.body(new AuthController.ErrorResponse("Insurance certificate is required"));
		}
		if (insurance.getSize() > maxSize) {
			return ResponseEntity.status(400)
					.body(new AuthController.ErrorResponse("Insurance file size must be less than 10MB"));
		}
		if (!isAllowedFileType(insurance.getContentType(), allowedTypes)) {
			return ResponseEntity.status(400)
					.body(new AuthController.ErrorResponse("Insurance must be a PDF, Word document, or image file"));
		}

		if (taxExempt != null && !taxExempt.isEmpty()) {
			if (taxExempt.getSize() > maxSize) {
				return ResponseEntity.status(400)
						.body(new AuthController.ErrorResponse("Tax-exempt file size must be less than 10MB"));
			}
			if (!isAllowedFileType(taxExempt.getContentType(), allowedTypes)) {
				return ResponseEntity.status(400).body(new AuthController.ErrorResponse(
						"Tax-exempt file must be a PDF, Word document, or image file"));
			}
		}

		// Hash Password
		String hashedPassword = passwordEncoder.encode(request.getPassword());

		// Create PetCenter Entity
		PetCenter petCenter = new PetCenter(request.getShelterName(), request.getContactPerson(), request.getEmail(),
				request.getPhone(), request.getWebsite(), request.getAddress(), request.getCity(), request.getState(),
				request.getZipCode(), request.getCountry(), request.getOrganizationType(), request.getYearEstablished(),
				request.getRegistrationNumber(), request.getTaxId(), request.getDescription(), request.getMission(),
				request.getSpecialPrograms(), request.getCapacity(), request.getAnimalsCurrently(),
				request.getServicesOffered(), request.getAdoptionFee(), null, // licensePath (set after saving)
				null, // insurancePath (set after saving)
				null, // taxExemptPath (set after saving)
				hashedPassword);

		// Save PetCenter to Generate ID
		petCenter = petCenterRepository.save(petCenter);

		// Store Files Using PetCenter ID
		String licensePath = fileStorageService.storeFile(license, petCenter.getId().toString(), "license");
		String insurancePath = fileStorageService.storeFile(insurance, petCenter.getId().toString(), "insurance");
		String taxExemptPath = taxExempt != null && !taxExempt.isEmpty()
				? fileStorageService.storeFile(taxExempt, petCenter.getId().toString(), "taxExempt")
				: null;

		// Update PetCenter with File Paths
		petCenter.setLicensePath(licensePath);
		petCenter.setInsurancePath(insurancePath);
		petCenter.setTaxExemptPath(taxExemptPath);
		petCenterRepository.save(petCenter);

		return ResponseEntity.status(201)
				.body(new AuthController.SuccessResponse("Pet Center signup successful", petCenter.getId()));
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest request) {
		if (request.getEmail() == null || request.getPassword() == null) {
			return ResponseEntity.status(400).body(new AuthController.ErrorResponse("Email and password are required"));
		}

		PetCenter petCenter = petCenterRepository.findByEmail(request.getEmail()).orElse(null);
		if (petCenter == null || !passwordEncoder.matches(request.getPassword(), petCenter.getPassword())) {
			return ResponseEntity.status(401).body(new AuthController.ErrorResponse("Invalid email or password"));
		}

		String token = jwtUtil.generateToken(petCenter.getEmail(), Role.ADMIN);
		return ResponseEntity
				.ok(new AuthController.LoginResponse("Pet Center login successful", petCenter.getId(), token));
	}

	private boolean isAllowedFileType(String contentType, String[] allowedTypes) {
		for (String type : allowedTypes) {
			if (type.equals(contentType)) {
				return true;
			}
		}
		return false;
	}
}
