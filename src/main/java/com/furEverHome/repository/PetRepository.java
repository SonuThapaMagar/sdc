package com.furEverHome.repository;

import com.furEverHome.entity.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface PetRepository extends JpaRepository<Pet, UUID> {
	List<Pet> findByCenterId(UUID centerId);
}