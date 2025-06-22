package com.furEverHome.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
                .allowedHeaders("*") // This allows all headers, but for security, list specific ones
                .exposedHeaders("Authorization") // Expose Authorization if needed by the client
                .allowCredentials(true) // Required for withCredentials
                .maxAge(3600);
        System.out.println("CORS configuration applied for /api/** from http://localhost:5173");
    }
}