package com.furEverHome.config;

import com.furEverHome.entity.Role;
import com.furEverHome.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

	private final JwtUtil jwtUtil;

	public JwtAuthenticationFilter(JwtUtil jwtUtil) {
		this.jwtUtil = jwtUtil;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		String path = request.getRequestURI();
		System.out.println("Processing request for path: " + path);
		
		// Skip authentication for public endpoints under /api/**
		if (path.startsWith("/api/") && !path.matches("/api/admin/.*|/api/superadmin/.*")) {
			System.out.println("Skipping authentication for public endpoint: " + path);
			filterChain.doFilter(request, response);
			return;
		}

		String header = request.getHeader("Authorization");
		if (header != null && header.startsWith("Bearer ")) {
			String token = header.substring(7);
			System.out.println("Found Authorization header with token: " + token);

			if (jwtUtil.validateToken(token)) {

				String email = jwtUtil.getEmailFromToken(token);
				Role role = jwtUtil.getRoleFromToken(token);
				System.out.println("Token validated for email: " + email + ", role: " + role);

				// Simulate authentication (UserDetailsService can be added later)
				UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        email, null, Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role.name())));
                SecurityContextHolder.getContext().setAuthentication(authentication);
			} else {
				System.out.println("Invalid token: " + token);
				response.setStatus(HttpServletResponse.SC_FORBIDDEN);
				return;
			}
		} else {
			System.out.println("No Authorization header or invalid format for path: " + path);
			response.setStatus(HttpServletResponse.SC_FORBIDDEN);
			return;
		}
		filterChain.doFilter(request, response);
	}
}