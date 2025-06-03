package com.furEverHome.repository;

import com.furEverHome.entity.AdoptionRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AdoptionRequestRepository extends JpaRepository<AdoptionRequest, UUID> {
	// Find all adoption requests for a specific pet
	List<AdoptionRequest> findByPetId(UUID petId);

	// Find all adoption requests by a specific user
	List<AdoptionRequest> findByUserId(UUID userId);
}