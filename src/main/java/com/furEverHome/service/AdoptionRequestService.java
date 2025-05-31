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
	private final EmailService emailService;

	@Autowired
	public AdoptionRequestService(AdoptionRequestRepository adoptionRequestRepository, UserRepository userRepository,
			PetRepository petRepository, EmailService emailService) {
		this.adoptionRequestRepository = adoptionRequestRepository;
		this.userRepository = userRepository;
		this.petRepository = petRepository;
		this.emailService = emailService;
	}

	@Transactional
	public AdoptionRequestResponse submitAdoptionRequest(String userEmail, AdoptionRequestSubmission requestDTO) {
		User user = userRepository.findByEmail(userEmail)
				.orElseThrow(() -> new IllegalArgumentException("User not found with email: " + userEmail));

		Pet pet = petRepository.findById(requestDTO.getPetId())
				.orElseThrow(() -> new IllegalArgumentException("Pet not found with ID: " + requestDTO.getPetId()));

		if (!"AVAILABLE".equals(pet.getStatus())) {
			throw new IllegalStateException("Pet is not available for adoption");
		}

		AdoptionRequest adoptionRequest = new AdoptionRequest(user, pet, requestDTO.getMotivation(),
				requestDTO.getLivingSituation(), requestDTO.getExperience());
		adoptionRequest = adoptionRequestRepository.save(adoptionRequest);

		return mapToResponseDTO(adoptionRequest);
	}

	public List<AdoptionRequestResponse> getAllAdoptionRequests() {
		return adoptionRequestRepository.findAll().stream().map(this::mapToResponseDTO).collect(Collectors.toList());
	}

	@Transactional
	public AdoptionRequestResponse updateAdoptionRequestStatus(UUID requestId, AdoptionRequestStatusUpdate updateDTO) {
		AdoptionRequest adoptionRequest = adoptionRequestRepository.findById(requestId)
				.orElseThrow(() -> new IllegalArgumentException("Adoption request not found with ID: " + requestId));

		if (adoptionRequest.getStatus() != AdoptionRequestStatus.PENDING) {
			throw new IllegalStateException("Only PENDING requests can be updated");
		}

		if (updateDTO.getStatus() == AdoptionRequestStatus.PENDING) {
			throw new IllegalArgumentException("Cannot set status back to PENDING");
		}

		adoptionRequest.setStatus(updateDTO.getStatus());
		adoptionRequest.setUpdatedAt(LocalDateTime.now());

		Pet pet = adoptionRequest.getPet();
		if (updateDTO.getStatus() == AdoptionRequestStatus.ACCEPTED) {
			pet.setStatus("ADOPTED");
			petRepository.save(pet);

			List<AdoptionRequest> otherRequests = adoptionRequestRepository.findByPetId(pet.getId());
			for (AdoptionRequest otherRequest : otherRequests) {
				if (otherRequest.getStatus() == AdoptionRequestStatus.PENDING
						&& !otherRequest.getId().equals(requestId)) {
					otherRequest.setStatus(AdoptionRequestStatus.REJECTED);
					otherRequest.setUpdatedAt(LocalDateTime.now());
					adoptionRequestRepository.save(otherRequest);
					emailService.sendAdoptionRejection(otherRequest.getUser().getEmail(), pet.getName());
				}
			}

			emailService.sendAdoptionConfirmation(adoptionRequest.getUser().getEmail(), pet.getName());
		} else if (updateDTO.getStatus() == AdoptionRequestStatus.REJECTED) {
			emailService.sendAdoptionRejection(adoptionRequest.getUser().getEmail(), pet.getName());
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
