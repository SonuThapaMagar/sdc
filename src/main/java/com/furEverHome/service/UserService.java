package com.furEverHome.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.furEverHome.dto.ProfileResponse;
import com.furEverHome.dto.ProfileUpdateRequest;
import com.furEverHome.entity.Role;
import com.furEverHome.entity.User;
import com.furEverHome.repository.UserRepository;

@Service
public class UserService {
	private final UserRepository userRepository;

	@Autowired
	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Transactional
	public ProfileResponse updateUserProfile(String email, ProfileUpdateRequest updateRequest, Role expectedRole) {
		// Find the user by email
		User user = userRepository.findByEmail(email)
				.orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email));

		// Verify role
		if (user.getRole() != expectedRole) {
			throw new IllegalStateException("User does not have the required role: " + expectedRole);
		}

		// Validate email uniqueness if email is being updated
		if (updateRequest.getEmail() != null && !updateRequest.getEmail().equals(user.getEmail())) {
			Optional<User> existingUserWithEmail = userRepository.findByEmail(updateRequest.getEmail());
			if (existingUserWithEmail.isPresent()) {
				throw new IllegalArgumentException("Email is already in use: " + updateRequest.getEmail());
			}
			user.setEmail(updateRequest.getEmail());
		}

		// Update other fields if provided
		if (updateRequest.getfullName() != null) {
			user.setFullName(updateRequest.getfullName());
		}
		if (updateRequest.getPhone() != null) {
			user.setPhone(updateRequest.getPhone());
		}
		if (updateRequest.getAddress() != null) {
			user.setAddress(updateRequest.getAddress());
		}

		// Save the updated user
		user = userRepository.save(user);

		// Map to response DTO
		return mapToProfileResponse(user);
	}

	private ProfileResponse mapToProfileResponse(User user) {
		ProfileResponse response = new ProfileResponse();
		response.setId(user.getId());
		response.setfullName(user.getFullName());
		response.setEmail(user.getEmail());
		response.setPhone(user.getPhone());
		response.setAddress(user.getAddress());
		return response;
	}
}
