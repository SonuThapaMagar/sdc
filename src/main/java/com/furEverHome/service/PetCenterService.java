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

        petCenter = petCenterRepository.save(petCenter);
        return mapToAdminProfileResponse(petCenter);
    }

    @Transactional
    public void deletePetCenter(UUID petCenterId) {
        PetCenter petCenter = petCenterRepository.findById(petCenterId)
                .orElseThrow(() -> new IllegalArgumentException("Pet Center not found with ID: " + petCenterId));

        // Delete all adoption requests associated with pets from this pet center
        List<Pet> pets = petRepository.findByCenterId(petCenterId);
        for (Pet pet : pets) {
            List<AdoptionRequest> adoptionRequests = adoptionRequestRepository.findByPetId(pet.getId());
            if (!adoptionRequests.isEmpty()) {
                adoptionRequestRepository.deleteAll(adoptionRequests);
            }
        }

        // Delete all pets associated with the pet center
        if (!pets.isEmpty()) {
            petRepository.deleteAll(pets);
        }

        petCenterRepository.delete(petCenter);
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