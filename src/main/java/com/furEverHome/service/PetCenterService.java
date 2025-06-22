package com.furEverHome.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.furEverHome.dto.AdminProfileResponse;
import com.furEverHome.dto.AdminProfileUpdateRequest;
import com.furEverHome.entity.AdoptionRequest;
import com.furEverHome.entity.Pet;
import com.furEverHome.entity.PetCenter;
import com.furEverHome.repository.AdoptionRequestRepository;
import com.furEverHome.repository.PetCenterRepository;
import com.furEverHome.repository.PetRepository;

@Service
public class PetCenterService {
	private final PetCenterRepository petCenterRepository;
	private final PetRepository petRepository;
	private final AdoptionRequestRepository adoptionRequestRepository;

	@Autowired
	public PetCenterService(PetCenterRepository petCenterRepository, PetRepository petRepository,
			AdoptionRequestRepository adoptionRequestRepository) {
		this.petCenterRepository = petCenterRepository;
		this.petRepository = petRepository;
		this.adoptionRequestRepository = adoptionRequestRepository;
	}

	public AdminProfileResponse getAdminProfileByEmail(String email) {
		PetCenter petCenter = petCenterRepository.findByEmail(email)
				.orElseThrow(() -> new IllegalArgumentException("Pet Center not found with email: " + email));
		return mapToAdminProfileResponse(petCenter);
	}

	public PetCenter getPetCenterById(UUID id) {
		return petCenterRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("Pet Center not found with ID: " + id));
	}

	@Transactional
	public AdminProfileResponse updatePetCenterProfile(String email, AdminProfileUpdateRequest updateRequest) {
		PetCenter petCenter = petCenterRepository.findByEmail(email)
				.orElseThrow(() -> new IllegalArgumentException("Pet Center not found with email: " + email));

		if (updateRequest.getEmail() != null && !updateRequest.getEmail().equals(petCenter.getEmail())) {
			Optional<PetCenter> existingPetCenterWithEmail = petCenterRepository.findByEmail(updateRequest.getEmail());
			if (existingPetCenterWithEmail.isPresent()) {
				throw new IllegalArgumentException("Email is already in use: " + updateRequest.getEmail());
			}
			petCenter.setEmail(updateRequest.getEmail());
		}

		if (updateRequest.getShelterName() != null) {
			petCenter.setShelterName(updateRequest.getShelterName());
		}
		if (updateRequest.getAddress() != null) {
			petCenter.setAddress(updateRequest.getAddress());
		}
		if (updateRequest.getPhone() != null) {
			petCenter.setPhone(updateRequest.getPhone());
		}
		if (updateRequest.getDescription() != null) {
			petCenter.setDescription(updateRequest.getDescription());
		}
		if (updateRequest.getCapacity() != null) {
			petCenter.setCapacity(updateRequest.getCapacity());
		}
		if (updateRequest.getWebsite() != null) {
			petCenter.setWebsite(updateRequest.getWebsite());
		}

		petCenter = petCenterRepository.save(petCenter);
		return mapToAdminProfileResponse(petCenter);
	}

	public List<AdminProfileResponse> getAllPetCenters() {
		return petCenterRepository.findAll().stream().map(this::mapToAdminProfileResponse).collect(Collectors.toList());
	}

	@Transactional
	public AdminProfileResponse updatePetCenter(UUID petCenterId, AdminProfileUpdateRequest updateRequest) {
		PetCenter petCenter = petCenterRepository.findById(petCenterId)
				.orElseThrow(() -> new IllegalArgumentException("Pet Center not found with ID: " + petCenterId));

		if (updateRequest.getEmail() != null && !updateRequest.getEmail().equals(petCenter.getEmail())) {
			Optional<PetCenter> existingPetCenterWithEmail = petCenterRepository.findByEmail(updateRequest.getEmail());
			if (existingPetCenterWithEmail.isPresent()) {
				throw new IllegalArgumentException("Email is already in use: " + updateRequest.getEmail());
			}
			petCenter.setEmail(updateRequest.getEmail());
		}

		if (updateRequest.getShelterName() != null) {
			petCenter.setShelterName(updateRequest.getShelterName());
		}
		if (updateRequest.getAddress() != null) {
			petCenter.setAddress(updateRequest.getAddress());
		}
		if (updateRequest.getPhone() != null) {
			petCenter.setPhone(updateRequest.getPhone());
		}
		if (updateRequest.getDescription() != null) {
			petCenter.setDescription(updateRequest.getDescription());
		}

		if (updateRequest.getCapacity() != null) {
			petCenter.setCapacity(updateRequest.getCapacity());
		}
		if (updateRequest.getWebsite() != null) {
			petCenter.setWebsite(updateRequest.getWebsite());
		}

		petCenter = petCenterRepository.save(petCenter);
		return mapToAdminProfileResponse(petCenter);
	}

	@Transactional
	public void deletePetCenter(UUID petCenterId) {
		PetCenter petCenter = petCenterRepository.findById(petCenterId)
				.orElseThrow(() -> new IllegalArgumentException("Pet Center not found with ID: " + petCenterId));

		List<Pet> pets = petRepository.findByCenterId(petCenterId);
		for (Pet pet : pets) {
			List<AdoptionRequest> adoptionRequests = adoptionRequestRepository.findByPetId(pet.getId());
			if (!adoptionRequests.isEmpty()) {
				adoptionRequestRepository.deleteAll(adoptionRequests);
			}
		}
		if (!pets.isEmpty()) {
			petRepository.deleteAll(pets);
		}
		petCenterRepository.delete(petCenter);
	}

	private AdminProfileResponse mapToAdminProfileResponse(PetCenter petCenter) {
		AdminProfileResponse response = new AdminProfileResponse();
		response.setId(petCenter.getId());
		response.setShelterName(petCenter.getShelterName());
		response.setAddress(petCenter.getAddress());
		response.setPhone(petCenter.getPhone());
		response.setDescription(petCenter.getDescription());
		response.setEmail(petCenter.getEmail());
		response.setCapacity(petCenter.getCapacity());
		return response;
	}
}