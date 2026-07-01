package com.example.auto_service.dto;

public class LoginResponse {

    private Long id;
    private String name;
    private String email;
    private boolean verified;

    public LoginResponse(
            Long id,
            String name,
            String email,
            boolean verified
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.verified = verified;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public boolean isVerified() {
        return verified;
    }
}