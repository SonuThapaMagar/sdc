package com.furEverHome.dto;

public class DashboardStatsResponse {
    private long totalUsers;
    private long totalPets;
    private long totalCenters;
    private long totalAdoptions;

    public DashboardStatsResponse(long totalUsers, long totalPets, long totalCenters, long totalAdoptions) {
        this.totalUsers = totalUsers;
        this.totalPets = totalPets;
        this.totalCenters = totalCenters;
        this.totalAdoptions = totalAdoptions;
    }

    // Getters and Setters
    public long getTotalUsers() { return totalUsers; }
    public void setTotalUsers(long totalUsers) { this.totalUsers = totalUsers; }
    public long getTotalPets() { return totalPets; }
    public void setTotalPets(long totalPets) { this.totalPets = totalPets; }
    public long getTotalCenters() { return totalCenters; }
    public void setTotalCenters(long totalCenters) { this.totalCenters = totalCenters; }
    public long getTotalAdoptions() { return totalAdoptions; }
    public void setTotalAdoptions(long totalAdoptions) { this.totalAdoptions = totalAdoptions; }
}