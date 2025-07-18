package com.furEverHome.dto;

import java.util.UUID;

public class AdoptionRequestSubmission {
	private UUID petId;
	private String motivation;
	private String housingType;
	private String ownRent;
	private String experience;
	private boolean hasYard;
	private boolean hasPets;
	private boolean agreement;
	

	// Getters and Setters
	public UUID getPetId() {
		return petId;
	}

	public void setPetId(UUID petId) {
		this.petId = petId;
	}

	public String getMotivation() {
		return motivation;
	}

	public void setMotivation(String motivation) {
		this.motivation = motivation;
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

	public boolean getHasYard() {
		return hasYard;
	}

	public void setHasYard(boolean hasYard) {
		this.hasYard = hasYard;
	}

	public boolean getHasPets() {
		return hasPets;
	}

	public void setHasPets(boolean hasPets) {
		this.hasPets = hasPets;
	}

	public boolean getAgreement() {
		return agreement;
	}

	public void setAgreement(boolean agreement) {
		this.agreement = agreement;
	}

	public String getExperience() {
		return experience;
	}

	public void setExperience(String experience) {
		this.experience = experience;
	}
	
}