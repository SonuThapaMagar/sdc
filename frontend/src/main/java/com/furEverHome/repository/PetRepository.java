package com.furEverHome.repository;

import com.furEverHome.entity.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface PetRepository extends JpaRepository<Pet, UUID> {
	List<Pet> findByCenterId(UUID centerId);

	// For admin: Search pets by centerId, name, and location
	@Query("SELECT p FROM Pet p WHERE p.centerId = :centerId "
			+ "AND LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%')) "
			+ "AND LOWER(p.location) LIKE LOWER(CONCAT('%', :location, '%'))")
	List<Pet> searchByCenterIdAndNameAndLocation(@Param("centerId") UUID centerId, @Param("name") String name,
			@Param("location") String location);

	// For users: Find all available pets (replaced with method name query
	// derivation)
	List<Pet> findByStatus(String status);

	// For users: Search available pets by name and location
	@Query("SELECT p FROM Pet p WHERE p.status = 'AVAILABLE' "
			+ "AND LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%')) "
			+ "AND LOWER(p.location) LIKE LOWER(CONCAT('%', :location, '%'))")
	List<Pet> searchAvailableByNameAndLocation(@Param("name") String name, @Param("location") String location);
}