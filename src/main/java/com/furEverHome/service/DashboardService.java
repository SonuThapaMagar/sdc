// com.furEverHome.service.DashboardService
package com.furEverHome.service;

import com.furEverHome.dto.DashboardStatsResponse;
import com.furEverHome.dto.MonthlyStatsResponse;
import com.furEverHome.dto.PetStatusResponse;
import com.furEverHome.dto.RecentActivityResponse;
import com.furEverHome.entity.AdoptionRequest;
import com.furEverHome.entity.Pet;
import com.furEverHome.entity.PetCenter;
import com.furEverHome.entity.User;
import com.furEverHome.repository.AdoptionRequestRepository;
import com.furEverHome.repository.PetCenterRepository;
import com.furEverHome.repository.PetRepository;
import com.furEverHome.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.time.LocalDateTime;
import java.time.format.TextStyle;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DashboardService {
	private static final Logger logger = LoggerFactory.getLogger(DashboardService.class);
	private final UserRepository userRepository;
	private final PetRepository petRepository;
	private final PetCenterRepository petCenterRepository;
	private final AdoptionRequestRepository adoptionRequestRepository;

	@Autowired
	public DashboardService(UserRepository userRepository, PetRepository petRepository,
			PetCenterRepository petCenterRepository, AdoptionRequestRepository adoptionRequestRepository) {
		this.userRepository = userRepository;
		this.petRepository = petRepository;
		this.petCenterRepository = petCenterRepository;
		this.adoptionRequestRepository = adoptionRequestRepository;
	}

	public DashboardStatsResponse getDashboardStats() {
		try {
			long totalUsers = userRepository.count();
			logger.info("Total Users: {}", totalUsers);
			long totalPets = petRepository.count();
			logger.info("Total Pets: {}", totalPets);
			long totalCenters = petCenterRepository.count();
			logger.info("Total Centers: {}", totalCenters);
			long totalAdoptions = adoptionRequestRepository.findAll().stream()
					.filter(ar -> ar != null && ar.getStatus() != null && "ACCEPTED".equals(ar.getStatus().name()))
					.count();
			logger.info("Total Adoptions: {}", totalAdoptions);

			return new DashboardStatsResponse(totalUsers, totalPets, totalCenters, totalAdoptions);
		} catch (Exception e) {
			logger.error("Error fetching dashboard stats: ", e);
			throw e; // Let the controller handle the exception
		}
	}

	public List<MonthlyStatsResponse> getMonthlyStats() {
		List<MonthlyStatsResponse> stats = new ArrayList<>();
		LocalDateTime now = LocalDateTime.now();
		List<User> users = userRepository.findAll();
		List<Pet> pets = petRepository.findAll();
		List<PetCenter> centers = petCenterRepository.findAll();
		List<AdoptionRequest> adoptions = adoptionRequestRepository.findAll();

		for (int i = 5; i >= 0; i--) {
			LocalDateTime start = now.minusMonths(i).withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0);
			LocalDateTime end = start.plusMonths(1).minusSeconds(1);
			String month = start.getMonth().getDisplayName(TextStyle.SHORT, Locale.US);

			long userCount = users.stream().filter(
					u -> u.getCreatedAt() != null && u.getCreatedAt().isAfter(start) && u.getCreatedAt().isBefore(end))
					.count();
			long petCount = pets.stream().filter(
					p -> p.getCreatedAt() != null && p.getCreatedAt().isAfter(start) && p.getCreatedAt().isBefore(end))
					.count();
			long centerCount = centers.stream().filter(
					c -> c.getCreatedAt() != null && c.getCreatedAt().isAfter(start) && c.getCreatedAt().isBefore(end))
					.count();
			long adoptionCount = adoptions.stream()
					.filter(a -> a.getUpdatedAt() != null && "ACCEPTED".equals(a.getStatus().name())
							&& a.getUpdatedAt().isAfter(start) && a.getUpdatedAt().isBefore(end))
					.count();

			stats.add(new MonthlyStatsResponse(month, userCount, petCount, centerCount, adoptionCount));
		}
		return stats;
	}

	public List<PetStatusResponse> getPetStatus() {
		List<Pet> pets = petRepository.findAll();
		long available = pets.stream().filter(p -> "AVAILABLE".equals(p.getStatus())).count();
		long adopted = pets.stream().filter(p -> "ADOPTED".equals(p.getStatus())).count();
		return Arrays.asList(new PetStatusResponse("Available", available, "#757FF6"),
				new PetStatusResponse("Adopted", adopted, "#4bb543"));
	}

	public Page<RecentActivityResponse> getRecentActivities(Pageable pageable) {
		// Fetch and combine recent activities with pagination
		List<RecentActivityResponse> activities = new ArrayList<>();

		// Recent users (paginated via repository if supported, otherwise limit in
		// memory)
		Page<User> userPage = userRepository.findAll(pageable);
		activities.addAll(userPage.getContent().stream()
				.map(user -> new RecentActivityResponse("user", "UserOutlined", "bg-[#e6e8fa]", "New user registration",
						user.getFullName() + " joined the platform", formatTimeAgo(user.getCreatedAt())))
				.collect(Collectors.toList()));

		// Recent pets
		Page<Pet> petPage = petRepository.findAll(pageable);
		activities.addAll(petPage.getContent().stream()
				.map(pet -> new RecentActivityResponse("pet", "AppstoreOutlined", "bg-[#ffe7e7]", "New pet added",
						pet.getName() + " is now available", formatTimeAgo(pet.getCreatedAt())))
				.collect(Collectors.toList()));

		// Recent centers
		Page<PetCenter> centerPage = petCenterRepository.findAll(pageable);
		activities.addAll(centerPage.getContent().stream()
				.map(center -> new RecentActivityResponse("center", "ShopOutlined", "bg-[#e7fbe7]",
						"New pet center registered", center.getShelterName() + " joined the network",
						formatTimeAgo(center.getCreatedAt())))
				.collect(Collectors.toList()));

		// Recent adoptions
		Page<AdoptionRequest> adoptionPage = adoptionRequestRepository.findAll(pageable);
		activities.addAll(
				adoptionPage.getContent().stream().filter(adoption -> "ACCEPTED".equals(adoption.getStatus().name()))
						.map(adoption -> new RecentActivityResponse("adoption", "SolutionOutlined", "bg-[#e6e8fa]",
								"New adoption", adoption.getPet().getName() + " found a new home",
								formatTimeAgo(adoption.getUpdatedAt())))
						.collect(Collectors.toList()));

		// Sort all activities by timestamp (descending)
		List<RecentActivityResponse> sortedActivities = activities.stream()
				.sorted(Comparator.comparing(RecentActivityResponse::getTimestamp).reversed())
				.collect(Collectors.toList());

		// Create a Page object (manual pagination since we combined multiple sources)
		int start = (int) pageable.getOffset();
		int end = Math.min((start + pageable.getPageSize()), sortedActivities.size());
		List<RecentActivityResponse> pagedActivities = sortedActivities.subList(start, end);

		return new PageImpl<>(pagedActivities, pageable, sortedActivities.size());
	}

	private String formatTimeAgo(LocalDateTime dateTime) {
		if (dateTime == null)
			return "Unknown time";
		LocalDateTime now = LocalDateTime.now();
		long seconds = java.time.Duration.between(dateTime, now).getSeconds();
		if (seconds < 60)
			return seconds + " seconds ago";
		long minutes = seconds / 60;
		if (minutes < 60)
			return minutes + " minute" + (minutes == 1 ? "" : "s") + " ago";
		long hours = minutes / 60;
		if (hours < 24)
			return hours + " hour" + (hours == 1 ? "" : "s") + " ago";
		long days = hours / 24;
		return days + " day" + (days == 1 ? "" : "s") + " ago";
	}
}