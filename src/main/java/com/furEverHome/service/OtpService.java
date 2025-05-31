package com.furEverHome.service;

import java.time.LocalDateTime;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.furEverHome.entity.User;
import com.furEverHome.repository.UserRepository;

@Service
public class OtpService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private JavaMailSender javaMailSender;

	public String generateOtp(User user) {

		if (user == null || user.getEmail() == null || user.getEmail().trim().isEmpty()) {
			throw new IllegalArgumentException("User or email cannot be null or empty");
		}

		String otp = String.format("%06d", new Random().nextInt(999999));

		user.setOtp(otp);
		user.setOtpExpiry(LocalDateTime.now().plusMinutes(10)); // OTP valid for 10 minutes
		userRepository.save(user);

		// Send OTP via email
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(user.getEmail());
		message.setSubject("Your OTP for Password Reset");
		message.setText("Your OTP is: " + otp + ". It is valid for 10 minutes.");
		message.setFrom("sonumagar787@gmail.com"); // Ensure this matches spring.mail.username
		try {
			javaMailSender.send(message);
			System.out.println("OTP " + otp + " sent successfully to email: " + user.getEmail());
		} catch (Exception e) {
			System.err.println("Failed to send OTP to " + user.getEmail() + ": " + e.getMessage());
			throw new RuntimeException("Failed to send OTP email", e);
		}
		return otp;
	}

	public boolean validateOtp(User user, String otp) {

		if (user == null || user.getOtp() == null || user.getOtpExpiry() == null) {
			return false;
		}
		return user.getOtp().equals(otp) && LocalDateTime.now().isBefore(user.getOtpExpiry());
	}

	public void clearOtp(User user) {
		user.setOtp(null);
		user.setOtpExpiry(null);
		userRepository.save(user);
	}
}
