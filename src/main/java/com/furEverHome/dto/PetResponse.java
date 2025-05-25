package com.furEverHome.dto;

import java.util.UUID;

public class PetResponse {

	private UUID id;
	private String name;
	private String breed;
	private int age;
	private String gender;
	private String description;
	private String location;
	private String status;

	public PetResponse(UUID id, String name, String breed, int age, String gender, String description, String location,
			String status) {
		this.id = id;
		this.name = name;
		this.breed = breed;
		this.age = age;
		this.gender = gender;
		this.description = description;
		this.location = location;
		this.status = status;
	}

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
}
