package com.furEverHome.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.furEverHome.dto.AdminProfileResponse;
import com.furEverHome.dto.AdminProfileUpdateRequest;
import com.furEverHome.entity.PetCenter;
import com.furEverHome.repository.PetCenterRepository;

@Service
public class PetCenterService {
	private final PetCenterRepository petCenterRepository;

	@Autowired
	public PetCenterService(PetCenterRepository petCenterRepository) {
		this.petCenterRepository = petCenterRepository;
	}

	@Transactional
	public AdminProfileResponse updatePetCenterProfile(String email, AdminProfileUpdateRequest updateRequest) {
		PetCenter petCenter = petCenterRepository.findByEmail(email)
				.orElseThrow(() -> new IllegalArgumentException("Pet Center not found with email: " + email));

		// Validate email uniqueness if email is being updated
		if (updateRequest.getEmail() != null && !updateRequest.getEmail().equals(petCenter.getEmail())) {
			Optional<PetCenter> existingPetCenterWithEmail = petCenterRepository.findByEmail(updateRequest.getEmail());
			if (existingPetCenterWithEmail.isPresent()) {
				throw new IllegalArgumentException("Email is already in use: " + updateRequest.getEmail());
			}
			petCenter.setEmail(updateRequest.getEmail());
		}

		// Update other fields if provided
		if (updateRequest.getName() != null) {
			petCenter.setName(updateRequest.getName());
		}
		if (updateRequest.getAddress() != null) {
			petCenter.setAddress(updateRequest.getAddress());
		}
		if (updateRequest.getContact() != null) {
			petCenter.setContact(updateRequest.getContact());
		}
		if (updateRequest.getDescription() != null) {
			petCenter.setDescription(updateRequest.getDescription());
		}

		// Save the updated pet center
		petCenter = petCenterRepository.save(petCenter);

		// Map to response DTO
		return mapToAdminProfileResponse(petCenter);
	}

	private AdminProfileResponse mapToAdminProfileResponse(PetCenter petCenter) {
		AdminProfileResponse response = new AdminProfileResponse();
		response.setId(petCenter.getId());
		response.setName(petCenter.getName());
		response.setAddress(petCenter.getAddress());
		response.setContact(petCenter.getContact());
		response.setDescription(petCenter.getDescription());
		response.setEmail(petCenter.getEmail());
		return response;
	}

}
