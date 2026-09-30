package com.example.auto_service.controller;

import com.example.auto_service.dto.AdminLoginRequest;
import com.example.auto_service.entity.Admin;
import com.example.auto_service.repository.AdminRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    private final AdminRepository repository;
    private final BCryptPasswordEncoder passwordEncoder;

    public AdminController(
            AdminRepository repository,
            BCryptPasswordEncoder passwordEncoder
    ) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody AdminLoginRequest request
    ) {

        Admin admin = repository
                .findByUserName(request.getUsername())
                .orElse(null);

        if (admin == null) {
            return ResponseEntity
                    .badRequest()
                    .body("Invalid username or password");
        }

        if (!passwordEncoder.matches(
                request.getPassword(),
                admin.getPassword()
        )) {

            return ResponseEntity
                    .badRequest()
                    .body("Invalid username or password");
        }

        return ResponseEntity.ok(admin);
    }

}