
package com.example.auto_service.controller;

import com.example.auto_service.dto.AdminLoginRequest;
import com.example.auto_service.entity.Admin;
import com.example.auto_service.repository.AdminRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminRepository repository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final SecurityContextRepository contextRepository;

    public AdminController(
            AdminRepository repository,
            BCryptPasswordEncoder passwordEncoder,
            SecurityContextRepository contextRepository
    ) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.contextRepository = contextRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody AdminLoginRequest request,
            HttpServletRequest httpRequest,
            HttpServletResponse httpResponse
    ) {
        if (request.getUsername() == null ||
            request.getPassword() == null) {
            return ResponseEntity.badRequest()
                    .body("Username and password required");
        }

        Admin admin = repository
                .findByUserName(request.getUsername())
                .orElse(null);

        if (admin == null ||
            admin.getPassword() == null ||
            !passwordEncoder.matches(
                request.getPassword(),
                admin.getPassword()
            )) {
            return ResponseEntity.status(401)
                    .body("Invalid username or password");
        }

        Authentication authentication =
            new UsernamePasswordAuthenticationToken(
                admin.getUserName(),
                null,
                List.of(new SimpleGrantedAuthority("ROLE_ADMIN"))
            );

        SecurityContext context =
            SecurityContextHolder.createEmptyContext();

        context.setAuthentication(authentication);
        SecurityContextHolder.setContext(context);

        httpRequest.getSession(true);
        httpRequest.changeSessionId();

        contextRepository.saveContext(
            context, httpRequest, httpResponse
        );

        return ResponseEntity.ok(
            Map.of(
                "id", admin.getId(),
                "username", admin.getUserName()
            )
        );
    }

    @GetMapping("/me")
    public ResponseEntity<?> currentAdmin(
            Authentication authentication
    ) {
        return ResponseEntity.ok(
            Map.of("username", authentication.getName())
        );
    }
}
