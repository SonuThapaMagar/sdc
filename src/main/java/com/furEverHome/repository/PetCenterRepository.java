package com.furEverHome.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.furEverHome.entity.PetCenter;

public interface PetCenterRepository extends JpaRepository<PetCenter, UUID> {
	
	Optional<PetCenter> findByEmail(String email);

	boolean existsByEmail(String email);

}
