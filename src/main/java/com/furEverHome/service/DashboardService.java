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
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.TextStyle;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DashboardService {

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
        long totalUsers = userRepository.count();
        long totalPets = petRepository.count();
        long totalCenters = petCenterRepository.count();
        long totalAdoptions = adoptionRequestRepository.findAll().stream()
                .filter(ar -> "ACCEPTED".equals(ar.getStatus().name()))
                .count();

        return new DashboardStatsResponse(totalUsers, totalPets, totalCenters, totalAdoptions);
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

            long userCount = users.stream()
                    .filter(u -> u.getCreatedAt() != null && u.getCreatedAt().isAfter(start) && u.getCreatedAt().isBefore(end))
                    .count();
            long petCount = pets.stream()
                    .filter(p -> p.getCreatedAt() != null && p.getCreatedAt().isAfter(start) && p.getCreatedAt().isBefore(end))
                    .count();
            long centerCount = centers.stream()
                    .filter(c -> c.getCreatedAt() != null && c.getCreatedAt().isAfter(start) && c.getCreatedAt().isBefore(end))
                    .count();
            long adoptionCount = adoptions.stream()
                    .filter(a -> a.getUpdatedAt() != null && "ACCEPTED".equals(a.getStatus().name()) &&
                            a.getUpdatedAt().isAfter(start) && a.getUpdatedAt().isBefore(end))
                    .count();

            stats.add(new MonthlyStatsResponse(month, userCount, petCount, centerCount, adoptionCount));
        }
        return stats;
    }

    public List<PetStatusResponse> getPetStatus() {
        List<Pet> pets = petRepository.findAll();
        long available = pets.stream().filter(p -> "AVAILABLE".equals(p.getStatus())).count();
        long adopted = pets.stream().filter(p -> "ADOPTED".equals(p.getStatus())).count();
        return Arrays.asList(
                new PetStatusResponse("Available", available, "#757FF6"),
                new PetStatusResponse("Adopted", adopted, "#4bb543")
        );
    }

    public List<RecentActivityResponse> getRecentActivities() {
        List<RecentActivityResponse> activities = new ArrayList<>();

        // Recent users
        List<User> recentUsers = userRepository.findAll().stream()
                .sorted((u1, u2) -> u2.getCreatedAt().compareTo(u1.getCreatedAt()))
                .limit(10)
                .collect(Collectors.toList());
        activities.addAll(recentUsers.stream()
                .map(user -> new RecentActivityResponse(
                        "user",
                        "UserOutlined",
                        "bg-[#e6e8fa]",
                        "New user registration",
                        user.getFullName() + " joined the platform",
                        formatTimeAgo(user.getCreatedAt())))
                .collect(Collectors.toList()));

        // Recent pets
        List<Pet> recentPets = petRepository.findAll().stream()
                .sorted((p1, p2) -> p2.getCreatedAt().compareTo(p1.getCreatedAt()))
                .limit(10)
                .collect(Collectors.toList());
        activities.addAll(recentPets.stream()
                .map(pet -> new RecentActivityResponse(
                        "pet",
                        "AppstoreOutlined",
                        "bg-[#ffe7e7]",
                        "New pet added",
                        pet.getName() + " is now available",
                        formatTimeAgo(pet.getCreatedAt())))
                .collect(Collectors.toList()));

        // Recent centers
        List<PetCenter> recentCenters = petCenterRepository.findAll().stream()
                .sorted((c1, c2) -> c2.getCreatedAt().compareTo(c1.getCreatedAt()))
                .limit(10)
                .collect(Collectors.toList());
        activities.addAll(recentCenters.stream()
                .map(center -> new RecentActivityResponse(
                        "center",
                        "ShopOutlined",
                        "bg-[#e7fbe7]",
                        "New pet center registered",
                        center.getShelterName() + " joined the network",
                        formatTimeAgo(center.getCreatedAt())))
                .collect(Collectors.toList()));

        // Recent adoptions
        List<AdoptionRequest> recentAdoptions = adoptionRequestRepository.findAll().stream()
                .filter(ar -> "ACCEPTED".equals(ar.getStatus().name()))
                .sorted((a1, a2) -> a2.getUpdatedAt().compareTo(a1.getUpdatedAt()))
                .limit(10)
                .collect(Collectors.toList());
        activities.addAll(recentAdoptions.stream()
                .map(adoption -> new RecentActivityResponse(
                        "adoption",
                        "SolutionOutlined",
                        "bg-[#e6e8fa]",
                        "New adoption",
                        adoption.getPet().getName() + " found a new home",
                        formatTimeAgo(adoption.getUpdatedAt())))
                .collect(Collectors.toList()));

        // Sort by timestamp (descending) and limit to 10
        return activities.stream()
                .sorted(Comparator.comparing(RecentActivityResponse::getTimestamp).reversed())
                .limit(10)
                .collect(Collectors.toList());
    }

    private String formatTimeAgo(LocalDateTime dateTime) {
        if (dateTime == null) return "Unknown time";
        LocalDateTime now = LocalDateTime.now();
        long seconds = java.time.Duration.between(dateTime, now).getSeconds();
        if (seconds < 60) return seconds + " seconds ago";
        long minutes = seconds / 60;
        if (minutes < 60) return minutes + " minute" + (minutes == 1 ? "" : "s") + " ago";
        long hours = minutes / 60;
        if (hours < 24) return hours + " hour" + (hours == 1 ? "" : "s") + " ago";
        long days = hours / 24;
        return days + " day" + (days == 1 ? "" : "s") + " ago";
    }
}