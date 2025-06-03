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
    private String motivation; // Why the user wants to adopt the pet

    @Column(name = "living_situation", nullable = false, length = 1000)
    private String livingSituation; // e.g., house/apartment, yard, other pets

    @Column(name = "experience", nullable = false, length = 1000)
    private String experience; // Experience with pets

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private AdoptionRequestStatus status;

    @Column(name = "submitted_at", nullable = false)
    private LocalDateTime submittedAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Constructors
    public AdoptionRequest() {
        this.status = AdoptionRequestStatus.PENDING; // Default status
        this.submittedAt = LocalDateTime.now();
    }

    public AdoptionRequest(User user, Pet pet, String motivation, String livingSituation, String experience) {
        this.user = user;
        this.pet = pet;
        this.motivation = motivation;
        this.livingSituation = livingSituation;
        this.experience = experience;
        this.status = AdoptionRequestStatus.PENDING;
        this.submittedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
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