package com.furEverHome.dto;

public class MonthlyStatsResponse {
    private String month;
    private long users;
    private long pets;
    private long centers;
    private long adoptions;

    public MonthlyStatsResponse(String month, long users, long pets, long centers, long adoptions) {
        this.month = month;
        this.users = users;
        this.pets = pets;
        this.centers = centers;
        this.adoptions = adoptions;
    }

    // Getters and Setters
    public String getMonth() { return month; }
    public void setMonth(String month) { this.month = month; }
    public long getUsers() { return users; }
    public void setUsers(long users) { this.users = users; }
    public long getPets() { return pets; }
    public void setPets(long pets) { this.pets = pets; }
    public long getCenters() { return centers; }
    public void setCenters(long centers) { this.centers = centers; }
    public long getAdoptions() { return adoptions; }
    public void setAdoptions(long adoptions) { this.adoptions = adoptions; }
}