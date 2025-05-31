package com.furEverHome.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.furEverHome.dto.AdoptionRequestResponse;
import com.furEverHome.dto.AdoptionRequestStatusUpdate;
import com.furEverHome.dto.AdoptionRequestSubmission;
import com.furEverHome.entity.AdoptionRequest;
import com.furEverHome.entity.AdoptionRequestStatus;
import com.furEverHome.entity.Pet;
import com.furEverHome.entity.User;
import com.furEverHome.repository.AdoptionRequestRepository;
import com.furEverHome.repository.PetRepository;
import com.furEverHome.repository.UserRepository;

@Service
public class AdoptionRequestService {
	private final AdoptionRequestRepository adoptionRequestRepository;
	private final UserRepository userRepository;
	private final PetRepository petRepository;

	@Autowired
	public AdoptionRequestService(AdoptionRequestRepository adoptionRequestRepository, UserRepository userRepository,
			PetRepository petRepository) {
		this.adoptionRequestRepository = adoptionRequestRepository;
		this.userRepository = userRepository;
		this.petRepository = petRepository;
	}

	@Transactional
	public AdoptionRequestResponse submitAdoptionRequest(String userEmail, AdoptionRequestSubmission requestDTO) {
		// Find the user by email
		User user = userRepository.findByEmail(userEmail)
				.orElseThrow(() -> new IllegalArgumentException("User not found with email: " + userEmail));

		// Find the pet by ID
		Pet pet = petRepository.findById(requestDTO.getPetId())
				.orElseThrow(() -> new IllegalArgumentException("Pet not found with ID: " + requestDTO.getPetId()));

		// Validate that the pet is available
		if (!"AVAILABLE".equals(pet.getStatus())) {
			throw new IllegalStateException("Pet is not available for adoption");
		}

		// Create and save the adoption request
		AdoptionRequest adoptionRequest = new AdoptionRequest(user, pet, requestDTO.getMotivation(),
				requestDTO.getLivingSituation(), requestDTO.getExperience());
		adoptionRequest = adoptionRequestRepository.save(adoptionRequest);

		// Convert to DTO and return
		return mapToResponseDTO(adoptionRequest);

	}

	public List<AdoptionRequestResponse> getAllAdoptionRequests() {
		return adoptionRequestRepository.findAll().stream().map(this::mapToResponseDTO).collect(Collectors.toList());
	}

	@Transactional
	public AdoptionRequestResponse updateAdoptionRequestStatus(UUID requestId, AdoptionRequestStatusUpdate updateDTO) {
		// Find the adoption request
		AdoptionRequest adoptionRequest = adoptionRequestRepository.findById(requestId)
				.orElseThrow(() -> new IllegalArgumentException("Adoption request not found with ID: " + requestId));

		// Validate status transition
		if (adoptionRequest.getStatus() != AdoptionRequestStatus.PENDING) {
			throw new IllegalStateException("Only PENDING requests can be updated");
		}

		if (updateDTO.getStatus() == AdoptionRequestStatus.PENDING) {
			throw new IllegalArgumentException("Cannot set status back to PENDING");
		}

		// Update the status and timestamp
		adoptionRequest.setStatus(updateDTO.getStatus());
		adoptionRequest.setUpdatedAt(LocalDateTime.now());

		// If accepted, update the pet's status to ADOPTED
		if (updateDTO.getStatus() == AdoptionRequestStatus.ACCEPTED) {
			Pet pet = adoptionRequest.getPet();
			pet.setStatus("ADOPTED");
			petRepository.save(pet);

			// Reject other pending requests for this pet
			List<AdoptionRequest> otherRequests = adoptionRequestRepository.findByPetId(pet.getId());
			for (AdoptionRequest otherRequest : otherRequests) {
				if (otherRequest.getStatus() == AdoptionRequestStatus.PENDING
						&& !otherRequest.getId().equals(requestId)) {
					otherRequest.setStatus(AdoptionRequestStatus.REJECTED);
					otherRequest.setUpdatedAt(LocalDateTime.now());
					adoptionRequestRepository.save(otherRequest);
				}
			}
		}

		adoptionRequest = adoptionRequestRepository.save(adoptionRequest);
		return mapToResponseDTO(adoptionRequest);

	}

	private AdoptionRequestResponse mapToResponseDTO(AdoptionRequest adoptionRequest) {
		AdoptionRequestResponse dto = new AdoptionRequestResponse();
		dto.setId(adoptionRequest.getId());
		dto.setUserId(adoptionRequest.getUser().getId());
		dto.setUserEmail(adoptionRequest.getUser().getEmail());
		dto.setPetId(adoptionRequest.getPet().getId());
		dto.setPetName(adoptionRequest.getPet().getName());
		dto.setMotivation(adoptionRequest.getMotivation());
		dto.setLivingSituation(adoptionRequest.getLivingSituation());
		dto.setExperience(adoptionRequest.getExperience());
		dto.setStatus(adoptionRequest.getStatus());
		dto.setSubmittedAt(adoptionRequest.getSubmittedAt());
		dto.setUpdatedAt(adoptionRequest.getUpdatedAt());
		return dto;
	}

}
