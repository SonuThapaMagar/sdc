package com.furEverHome.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.furEverHome.repository.PetRepository;
import com.furEverHome.repository.UserRepository;
import com.furEverHome.util.JwtUtil;

@Controller
@RequestMapping("/api/user")
public class UserController {

	private final UserRepository userRepository;
	private final PetRepository petRepository;
	private final JwtUtil jwtUtil;

	@Autowired
	public UserController(UserRepository userRepository, PetRepository petRepository, JwtUtil jwtUtil) {
		this.userRepository = userRepository;
		this.petRepository = petRepository;
		this.jwtUtil = jwtUtil;

	}
	
	

}
