package com.furEverHome.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.furEverHome.util.JwtUtil;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Autowired
	private JwtUtil jwtUtil;

	// Filter Chain is a set of filters that checks every HTTP request like login,
	// logout, authentication, and access control.
	// Before any request reaches our controller, it goes through these filters to
	// make sure the user is allowed to access the resource.
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.authorizeHttpRequests(auth -> {
			auth.requestMatchers("/api/auth/**", "/api/admin/auth/**", "/api/test").permitAll()
					.requestMatchers("/api/admin/**").hasRole("ADMIN")
					.requestMatchers("/api/superadmin/**").hasRole("SUPERADMIN")
					.anyRequest().authenticated();
		}).addFilterBefore(new JwtAuthenticationFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class)
				.formLogin(form -> form.disable())
				.httpBasic(httpBasic -> httpBasic.disable())
				.csrf(csrf -> csrf.disable());

		System.out.println("Security configuration applied.");
		return http.build();
	}
}