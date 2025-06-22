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

        // Add CORS headers for all responses
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Explicitly allow Authorization
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Max-Age", "3600");

        // Skip authentication for public endpoints and OPTIONS requests
        if (request.getMethod().equals("OPTIONS") ||
            path.startsWith("/api/auth") ||
            path.startsWith("/api/admin/auth") ||
            path.startsWith("/api/superadmin/auth") ||
            path.equals("/api/test")) {
            System.out.println("Skipping authentication for: " + path + " (Method: " + request.getMethod() + ")");
            filterChain.doFilter(request, response);
            return;
        }

        String header = request.getHeader("Authorization");
        if (header == null || !header.startsWith("Bearer ")) {
            System.out.println("No Authorization header or invalid format for path: " + path);
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("{\"message\": \"Authorization header missing or invalid\"}");
            return;
        }

        String token = header.substring(7);
        System.out.println("Found Authorization header with token: " + token);

        if (!jwtUtil.validateToken(token)) {
            System.out.println("Invalid token: " + token);
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("{\"message\": \"Invalid or expired token\"}");
            return;
        }

        String email = jwtUtil.getEmailFromToken(token);
        Role role = jwtUtil.getRoleFromToken(token);
        System.out.println("Token validated for email: " + email + ", role: " + role);

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                email, null, Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role.name())));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        filterChain.doFilter(request, response);
    }
}