package com.example.auto_service.service;

import com.example.auto_service.dto.EmailDetails;

public interface EmailService {

    String sendSimpleMail(
            EmailDetails details
    );

    String sendMailWithAttachment(
            EmailDetails details
    );
}