package com.furEverHome.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "pets")
public class Pet {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	@Column(name = "id", updatable = false, nullable = false)
	private UUID id;

	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "breed", nullable = false)
	private String breed;

	@Column(name = "age", nullable = false)
	private int age;

	@Column(name = "gender", nullable = false)
	private String gender;

	@Column(name = "description")
	private String description;

	@Column(name = "location", nullable = false)
	private String location;

	@Column(name = "status", nullable = false)
	private String status; // AVAILABLE, ADOPTED

	@Column(name = "center_id", nullable = false)
	private UUID centerId; // References the PetCenter ID

	@Column(name = "created_at", nullable = false)
	private LocalDateTime createdAt;

	public Pet() {
	}

	public Pet(String name, String breed, int age, String gender, String description, String location, String status,
			UUID centerId) {
		this.name = name;
		this.breed = breed;
		this.age = age;
		this.gender = gender;
		this.description = description;
		this.location = location;
		this.status = status;
		this.centerId = centerId;
		this.createdAt = LocalDateTime.now();
	}

	// Getters and Setters
	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getBreed() {
		return breed;
	}

	public void setBreed(String breed) {
		this.breed = breed;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public UUID getCenterId() {
		return centerId;
	}

	public void setCenterId(UUID centerId) {
		this.centerId = centerId;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
}