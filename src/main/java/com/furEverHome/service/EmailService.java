package com.furEverHome.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
	private final JavaMailSender emailSender;

	@Autowired
	public EmailService(JavaMailSender emailSender) {
		this.emailSender = emailSender;
	}

	public void sendAdoptionConfirmation(String toEmail, String petName) {

		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(toEmail);
		message.setSubject("Adoption Request Approved!");
		message.setText("Congratulations! Your adoption request for " + petName
				+ " has been approved. Please visit the pet center to complete the adoption process.");
		emailSender.send(message);
	}

	public void sendAdoptionRejection(String toEmail, String petName) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(toEmail);
		message.setSubject("Adoption Request Update");
		message.setText("We regret to inform you that your adoption request for " + petName
				+ " has been rejected as another applicant was selected.");
		emailSender.send(message);
	}
}
