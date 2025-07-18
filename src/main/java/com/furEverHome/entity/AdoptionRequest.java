package com.furEverHome.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "adoption_request")
public class AdoptionRequest {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	@Column(name = "id", updatable = false, nullable = false)
	private UUID id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "pet_id", nullable = false)
	private Pet pet;

	@Column(name = "motivation", nullable = false, length = 1000)
	private String motivation;

	@Column(name = "living_situation", nullable = false, length = 1000)
	private String livingSituation;

	@Column(name = "experience", length = 1000)
	private String experience;

	@Column(name = "housing_type", nullable = false, length = 50)
	private String housingType;

	@Column(name = "own_rent", nullable = false, length = 10)
	private String ownRent;

	@Column(name = "has_yard", nullable = false)
	private Boolean hasYard;

	@Column(name = "has_pets", nullable = false)
	private Boolean hasPets;

	@Column(name = "agreement", nullable = false)
	private Boolean agreement;

	@Enumerated(EnumType.STRING)
	@Column(name = "status", nullable = false)
	private AdoptionRequestStatus status;

	@Column(name = "submitted_at", nullable = false)
	private LocalDateTime submittedAt;

	@Column(name = "updated_at")
	private LocalDateTime updatedAt;
	
	public AdoptionRequest() {
    }

	public AdoptionRequest(User user, Pet pet, String motivation, String livingSituation, String experience,
			String housingType, String ownRent, Boolean hasYard, Boolean hasPets, Boolean agreement) {
		this.user = user;
		this.pet = pet;
		this.motivation = motivation;
		this.livingSituation = livingSituation;
		this.experience = experience;
		this.housingType = housingType;
		this.ownRent = ownRent;
		this.hasYard = hasYard;
		this.hasPets = hasPets;
		this.agreement = agreement;
		this.status = AdoptionRequestStatus.PENDING;
		this.submittedAt = LocalDateTime.now();
	}

	// Getters and Setters
	public UUID getId() {
		return id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Pet getPet() {
		return pet;
	}

	public void setPet(Pet pet) {
		this.pet = pet;
	}

	public String getMotivation() {
		return motivation;
	}

	public void setMotivation(String motivation) {
		this.motivation = motivation;
	}

	public String getLivingSituation() {
		return livingSituation;
	}

	public void setLivingSituation(String livingSituation) {
		this.livingSituation = livingSituation;
	}

	public String getExperience() {
		return experience;
	}

	public void setExperience(String experience) {
		this.experience = experience;
	}

	public String getHousingType() {
		return housingType;
	}

	public void setHousingType(String housingType) {
		this.housingType = housingType;
	}

	public String getOwnRent() {
		return ownRent;
	}

	public void setOwnRent(String ownRent) {
		this.ownRent = ownRent;
	}

	public Boolean getHasYard() {
		return hasYard;
	}

	public void setHasYard(Boolean hasYard) {
		this.hasYard = hasYard;
	}

	public Boolean getHasPets() {
		return hasPets;
	}

	public void setHasPets(Boolean hasPets) {
		this.hasPets = hasPets;
	}

	public Boolean getAgreement() {
		return agreement;
	}

	public void setAgreement(Boolean agreement) {
		this.agreement = agreement;
	}

	public AdoptionRequestStatus getStatus() {
		return status;
	}

	public void setStatus(AdoptionRequestStatus status) {
		this.status = status;
	}

	public LocalDateTime getSubmittedAt() {
		return submittedAt;
	}

	public void setSubmittedAt(LocalDateTime submittedAt) {
		this.submittedAt = submittedAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}
}