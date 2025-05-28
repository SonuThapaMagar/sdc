package com.furEverHome.util;

import java.util.Date;

import org.springframework.stereotype.Component;

import com.furEverHome.entity.Role;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

	private final String SECRET_KEY = "c3157becaa73426f6da36edea4755c826187bc3c2e6d782111a043cf5471718a";
	private final long EXPIRATION_TIME = 1000 * 60 * 60;

	public String generateToken(String email, Role role) {
		return Jwts.builder()
				.subject(email)
				.claim("role", role.name()).issuedAt(new Date())
				.expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
				.signWith(Keys.hmacShaKeyFor(SECRET_KEY.getBytes()), Jwts.SIG.HS512).compact();
	}

	public String getEmailFromToken(String token) {
		return Jwts.parser().verifyWith(Keys.hmacShaKeyFor(SECRET_KEY.getBytes())).build()
				.parseSignedClaims(token)
				.getPayload()
				.getSubject();
	}

	public Role getRoleFromToken(String token) {
		String role = Jwts.parser().verifyWith(Keys.hmacShaKeyFor(SECRET_KEY.getBytes())).build()
				.parseSignedClaims(token).getPayload().get("role", String.class);
		return Role.valueOf(role);
	}

	public boolean validateToken(String token) {
		try {
			Jwts.parser()
			.setSigningKey(Keys.hmacShaKeyFor(SECRET_KEY.getBytes()))
            .build()
            .parseClaimsJws(token);
			return true;
		} catch (JwtException | IllegalArgumentException e) {
			return false;
		}
	}

}
