package com.example.auto_service.controller;

import com.example.auto_service.dto.EmailDetails;
import com.example.auto_service.service.EmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class EmailController {

    @Autowired
    private EmailService emailService;

    // Send simple email
    @PostMapping("/sendMail")
    public String sendMail(
            @RequestBody EmailDetails details) {

        return emailService.sendSimpleMail(details);
    }

    // Send email with attachment
    @PostMapping("/sendMailWithAttachment")
    public String sendMailWithAttachment(
            @RequestBody EmailDetails details) {

        return emailService
                .sendMailWithAttachment(details);
    }
    
    
} 
