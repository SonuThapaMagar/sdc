package com.furEverHome.dto;

public class PetStatusResponse {
    private String name;
    private long value;
    private String color;

    public PetStatusResponse(String name, long value, String color) {
        this.name = name;
        this.value = value;
        this.color = color;
    }

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public long getValue() { return value; }
    public void setValue(long value) { this.value = value; }
    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }
}