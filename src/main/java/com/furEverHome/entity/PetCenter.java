package com.furEverHome.entity;

import java.util.List;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "petCenters")
public class PetCenter {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	@Column(name = "id", updatable = false, nullable = false)
	private UUID id;

	// Basic Information
	@Column(name = "shelter_name", nullable = false)
	private String shelterName;

	@Column(name = "contact_person", nullable = false)
	private String contactPerson;

	@Column(name = "email", nullable = false, unique = true)
	private String email;

	@Column(name = "phone", nullable = false)
	private String phone;

	@Column(name = "website")
	private String website;

	@Column(name = "address", nullable = false)
	private String address;

	@Column(name = "city", nullable = false)
	private String city;

	@Column(name = "state", nullable = false)
	private String state;

	@Column(name = "zip_code", nullable = false)
	private String zipCode;

	@Column(name = "country")
	private String country;

	// Organization Details
	@Column(name = "organization_type", nullable = false)
	private String organizationType;

	@Column(name = "year_established", nullable = false)
	private Integer yearEstablished;

	@Column(name = "registration_number")
	private String registrationNumber;

	@Column(name = "tax_id")
	private String taxId;

	@Column(name = "description", nullable = false)
	private String description;

	@Column(name = "mission")
	private String mission;

	@Column(name = "special_programs")
	private String specialPrograms;

	// Capacity & Services
	@Column(name = "capacity", nullable = false)
	private Integer capacity;

	@Column(name = "animals_currently", nullable = false)
	private Integer animalsCurrently;

	@ElementCollection
	@Column(name = "services_offered")
	private List<String> servicesOffered;

	@Column(name = "adoption_fee")
	private String adoptionFee;

	// Documents (paths to stored files)
	@Column(name = "license_path")
	private String licensePath;

	@Column(name = "insurance_path")
	private String insurancePath;

	@Column(name = "tax_exempt_path")
	private String taxExemptPath;

	// Authentication
	@Column(name = "password", nullable = false)
	private String password;

	public PetCenter() {
	}

	public PetCenter(String shelterName, String contactPerson, String email, String phone, String website,
			String address, String city, String state, String zipCode, String country, String organizationType,
			Integer yearEstablished, String registrationNumber, String taxId, String description, String mission,
			String specialPrograms, Integer capacity, Integer animalsCurrently, List<String> servicesOffered,
			String adoptionFee, String licensePath, String insurancePath, String taxExemptPath, String password) {
		this.shelterName = shelterName;
		this.contactPerson = contactPerson;
		this.email = email;
		this.phone = phone;
		this.website = website;
		this.address = address;
		this.city = city;
		this.state = state;
		this.zipCode = zipCode;
		this.country = country;
		this.organizationType = organizationType;
		this.yearEstablished = yearEstablished;
		this.registrationNumber = registrationNumber;
		this.taxId = taxId;
		this.description = description;
		this.mission = mission;
		this.specialPrograms = specialPrograms;
		this.capacity = capacity;
		this.animalsCurrently = animalsCurrently;
		this.servicesOffered = servicesOffered;
		this.adoptionFee = adoptionFee;
		this.licensePath = licensePath;
		this.insurancePath = insurancePath;
		this.taxExemptPath = taxExemptPath;
		this.password = password;
	}

	// Getters and Setters
	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

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

	public String getLicensePath() {
		return licensePath;
	}

	public void setLicensePath(String licensePath) {
		this.licensePath = licensePath;
	}

	public String getInsurancePath() {
		return insurancePath;
	}

	public void setInsurancePath(String insurancePath) {
		this.insurancePath = insurancePath;
	}

	public String getTaxExemptPath() {
		return taxExemptPath;
	}

	public void setTaxExemptPath(String taxExemptPath) {
		this.taxExemptPath = taxExemptPath;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
