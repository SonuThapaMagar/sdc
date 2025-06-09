package com.furEverHome.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.furEverHome.dto.UserResponse;
import com.furEverHome.dto.UserUpdateRequest;
import com.furEverHome.entity.AdoptionRequest;
import com.furEverHome.entity.Role;
import com.furEverHome.entity.User;
import com.furEverHome.repository.AdoptionRequestRepository;
import com.furEverHome.repository.UserRepository;

@Service
public class UserService {
	private final UserRepository userRepository;
    private final AdoptionRequestRepository adoptionRequestRepository;

    @Autowired
    public UserService(UserRepository userRepository, AdoptionRequestRepository adoptionRequestRepository) {
        this.userRepository = userRepository;
        this.adoptionRequestRepository = adoptionRequestRepository;
    }

	@Transactional
	public UserResponse updateUserProfile(String email, UserUpdateRequest updateRequest, Role expectedRole) {
		User user = userRepository.findByEmail(email)
				.orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email));

		if (user.getRole() != expectedRole) {
			throw new IllegalStateException("User does not have the required role: " + expectedRole);
		}

		if (updateRequest.getEmail() != null && !updateRequest.getEmail().equals(user.getEmail())) {
			Optional<User> existingUserWithEmail = userRepository.findByEmail(updateRequest.getEmail());
			if (existingUserWithEmail.isPresent()) {
				throw new IllegalArgumentException("Email is already in use: " + updateRequest.getEmail());
			}
			user.setEmail(updateRequest.getEmail());
		}

		if (updateRequest.getFullName() != null) {
			user.setFullName(updateRequest.getFullName());
		}
		if (updateRequest.getPhone() != null) {
			user.setPhone(updateRequest.getPhone());
		}
		if (updateRequest.getAddress() != null) {
			user.setAddress(updateRequest.getAddress());
		}

		user = userRepository.save(user);
		return mapToUserResponse(user);
	}

	public List<UserResponse> getAllUsers() {
		return userRepository.findAll().stream().filter(user -> user.getRole() == Role.USER)
				.map(this::mapToUserResponse).collect(Collectors.toList());
	}

	@Transactional
	public UserResponse updateUser(UUID userId, UserUpdateRequest updateRequest) {
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

		if (user.getRole() != Role.USER) {
			throw new IllegalStateException("Can only update users with role USER");
		}

		if (updateRequest.getEmail() != null && !updateRequest.getEmail().equals(user.getEmail())) {
			Optional<User> existingUserWithEmail = userRepository.findByEmail(updateRequest.getEmail());
			if (existingUserWithEmail.isPresent()) {
				throw new IllegalArgumentException("Email is already in use: " + updateRequest.getEmail());
			}
			user.setEmail(updateRequest.getEmail());
		}

		if (updateRequest.getFullName() != null) {
			user.setFullName(updateRequest.getFullName());
		}
		if (updateRequest.getPhone() != null) {
			user.setPhone(updateRequest.getPhone());
		}
		if (updateRequest.getAddress() != null) {
			user.setAddress(updateRequest.getAddress());
		}

		user = userRepository.save(user);
		return mapToUserResponse(user);
	}

	@Transactional
	public void deleteUser(UUID userId) {
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));
		if (user.getRole() != Role.USER) {
			throw new IllegalStateException("Can only delete users with role USER");
		}

		// Delete all adoption requests associated with the user
		List<AdoptionRequest> adoptionRequests = adoptionRequestRepository.findByUserId(userId);
		if (!adoptionRequests.isEmpty()) {
			adoptionRequestRepository.deleteAll(adoptionRequests);
		}
		userRepository.delete(user);
	}

	private UserResponse mapToUserResponse(User user) {
		UserResponse response = new UserResponse();
		response.setId(user.getId());
		response.setFullName(user.getFullName());
		response.setEmail(user.getEmail());
		response.setPhone(user.getPhone());
		response.setAddress(user.getAddress());
		return response;
	}
}