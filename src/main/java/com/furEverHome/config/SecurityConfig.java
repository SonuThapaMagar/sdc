package com.furEverHome.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	// The Security Filter Chain is a set of filters that checks every HTTP request.
	// It handles things like login, logout, authentication, and access control.
	// Before any request reaches our controller, it goes through these filters
	// to make sure the user is allowed to access the resource.
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.authorizeHttpRequests(auth -> {
			auth.requestMatchers("/api/**").permitAll() // Allow all /api endpoints for now
			.anyRequest().authenticated();
		}).formLogin(form -> form.disable())
		.httpBasic(httpBasic -> httpBasic.disable())
		.csrf(csrf -> csrf.disable());
												
		return http.build();
	}
}