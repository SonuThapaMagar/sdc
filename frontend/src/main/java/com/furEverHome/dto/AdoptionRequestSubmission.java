package com.furEverHome.dto;

import java.util.UUID;

public class AdoptionRequestSubmission {
	private UUID petId;
	private String motivation;
	private String livingSituation;
	private String experience;

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

}
