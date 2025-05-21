package com.furEverHome.util;

import org.springframework.stereotype.Component;

@Component
public class JwtUtil {
	
	private final String SECRET_KEY ="fureverhome";
	private final long EXPIRATION_TIME = 1000 * 60 * 60 * 365;
	
	

}
