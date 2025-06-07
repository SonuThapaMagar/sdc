package com.furEverHome.dto;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public class PetCenterSignupRequest {

	// Basic Information
	private String shelterName;
	private String contactPerson;
	private String email;
	private String phone;
	private String website;
	private String address;
	private String city;
	private String state;
	private String zipCode;
	private String country;

	// Organization Details
	private String organizationType;
	private Integer yearEstablished;
	private String registrationNumber;
	private String taxId;
	private String description;
	private String mission;
	private String specialPrograms;

	// Capacity & Services
	private Integer capacity;
	private Integer animalsCurrently;
	private List<String> servicesOffered;
	private String adoptionFee;

	// Documents
	private MultipartFile license;
	private MultipartFile insurance;
	private MultipartFile taxExempt;

	// Authentication
	private String password;

	// Getters and Setters
	public String getShelterName() {
		return shelterName;
	}

	public void setShelterName(String shelterName) {
		this.shelterName = shelterName;
	}

	public String getContactPerson() {
		return contactPerson;
	}

	public void setContactPerson(String contactPerson) {
		this.contactPerson = contactPerson;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getWebsite() {
		return website;
	}

	public void setWebsite(String website) {
		this.website = website;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getZipCode() {
		return zipCode;
	}

	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getOrganizationType() {
		return organizationType;
	}

	public void setOrganizationType(String organizationType) {
		this.organizationType = organizationType;
	}

	public Integer getYearEstablished() {
		return yearEstablished;
	}

	public void setYearEstablished(Integer yearEstablished) {
		this.yearEstablished = yearEstablished;
	}

	public String getRegistrationNumber() {
		return registrationNumber;
	}

	public void setRegistrationNumber(String registrationNumber) {
		this.registrationNumber = registrationNumber;
	}

	public String getTaxId() {
		return taxId;
	}

	public void setTaxId(String taxId) {
		this.taxId = taxId;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getMission() {
		return mission;
	}

	public void setMission(String mission) {
		this.mission = mission;
	}

	public String getSpecialPrograms() {
		return specialPrograms;
	}

	public void setSpecialPrograms(String specialPrograms) {
		this.specialPrograms = specialPrograms;
	}

	public Integer getCapacity() {
		return capacity;
	}

	public void setCapacity(Integer capacity) {
		this.capacity = capacity;
	}

	public Integer getAnimalsCurrently() {
		return animalsCurrently;
	}

	public void setAnimalsCurrently(Integer animalsCurrently) {
		this.animalsCurrently = animalsCurrently;
	}

	public List<String> getServicesOffered() {
		return servicesOffered;
	}

	public void setServicesOffered(List<String> servicesOffered) {
		this.servicesOffered = servicesOffered;
	}

	public String getAdoptionFee() {
		return adoptionFee;
	}

	public void setAdoptionFee(String adoptionFee) {
		this.adoptionFee = adoptionFee;
	}

	public MultipartFile getLicense() {
		return license;
	}

	public void setLicense(MultipartFile license) {
		this.license = license;
	}

	public MultipartFile getInsurance() {
		return insurance;
	}

	public void setInsurance(MultipartFile insurance) {
		this.insurance = insurance;
	}

	public MultipartFile getTaxExempt() {
		return taxExempt;
	}

	public void setTaxExempt(MultipartFile taxExempt) {
		this.taxExempt = taxExempt;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
