package com.example.auto_service.controller;

import com.example.auto_service.dto.EmailDetails;
import com.example.auto_service.dto.ForgotPasswordRequest;
import com.example.auto_service.dto.LoginRequest;
import com.example.auto_service.dto.LoginResponse;
import com.example.auto_service.dto.VerifyRequest;
import com.example.auto_service.entity.Customer;
import com.example.auto_service.repository.CustomerRepository;
import com.example.auto_service.service.EmailService;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.SecurityContextRepository;

import java.util.Map;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/customers")

public class CustomerController {

    private final CustomerRepository repository;
    private final EmailService emailService;
    private final BCryptPasswordEncoder passwordEncoder;
    private final SecurityContextRepository contextRepository;

    public CustomerController(CustomerRepository repository,
         EmailService emailService, BCryptPasswordEncoder passwordEncoder,SecurityContextRepository contextRepository) 
        {
        this.repository = repository;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
        this.contextRepository = contextRepository;
        }

    @GetMapping
    public List<Customer> getAllCustomers() {
        return repository.findAll();
    }

    @PostMapping("/register")
        public ResponseEntity<?> createCustomer(
                @RequestBody Customer customer
        ) {

            Optional<Customer> existing =
                    repository.findByEmail(
                            customer.getEmail()
                    );

            if (existing.isPresent()) {

                if (existing.get().isVerified()) {

                    return ResponseEntity
                            .badRequest()
                            .body("Email already registered");
                }

                return ResponseEntity
                        .badRequest()
                        .body("Please verify your email first");
            }

            String code =
                    String.valueOf(
                            (int) (100000 + Math.random() * 900000)
                    );

            customer.setVerifCode(code);
            customer.setVerified(false);

            customer.setPassword(
                passwordEncoder.encode(
                    customer.getPassword()
                )
            );

            Customer savedCustomer =
                    repository.save(customer);

            EmailDetails email = new EmailDetails();

            email.setRecipient(savedCustomer.getEmail());
            email.setSubject("Auto Service Verification");
            email.setMsgBody("Your verification code is: " + code);
            emailService.sendSimpleMail(email);

            return ResponseEntity.ok(savedCustomer);
        }
    
    @PostMapping("/verify")
        public ResponseEntity<String> verify(
                @RequestBody VerifyRequest request
        ) {

        Customer customer = repository.findByEmail(
                    request.getEmail()
                ).orElse(null);

        if (customer != null) {

            System.out.println(
                "DB Code: " +
                customer.getVerifCode()
            );

            System.out.println(
                "Request Code: " +
                request.getCode()
            );

            if (
                customer.getVerifCode()
                    .equals(request.getCode())
            ) {

                customer.setVerified(true);
                customer.setVerifCode(null);
                

                Customer savedCustomer =  repository.save(customer);

                return ResponseEntity.ok(
                    "Verified"
                );
            }
        }

        return ResponseEntity
                .badRequest()
                .body("Invalid Code");
        }

        
    
    
    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request,
            HttpServletRequest httpRequest,
            HttpServletResponse httpResponse
    ) {
        if (request.getPhone() == null ||
            request.getPassword() == null) {
            return ResponseEntity.badRequest()
                    .body("Phone and password are required");
        }

        Customer customer = repository.findByPhone(request.getPhone())
                .orElse(null);

        if (customer == null ||
            customer.getPassword() == null ||
            !passwordEncoder.matches(
                    request.getPassword(),
                    customer.getPassword()
            )) {
            return ResponseEntity.status(401)
                    .body("Invalid phone or password");
        }

        if (!customer.isVerified()) {
            return ResponseEntity.status(403)
                    .body("Please verify your email");
        }

        Authentication authentication =
                new UsernamePasswordAuthenticationToken(
                        customer.getPhone(),
                        null,
                        List.of(new SimpleGrantedAuthority("ROLE_CUSTOMER"))
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

        return ResponseEntity.ok(customer);
    }



    @PostMapping("/resend-code")
        public ResponseEntity<String> resendCode(
                @RequestBody VerifyRequest request
        ) {

            Customer customer =
                    repository.findByEmail(
                            request.getEmail()
                    ).orElse(null);

            if (customer == null) {
                return ResponseEntity
                        .badRequest()
                        .body("Customer not found");
            }

        String code = String.valueOf(
                        (int)(100000 + Math.random() * 900000)
                );

        customer.setVerifCode(code);

        repository.save(customer);

        EmailDetails email = new EmailDetails();

        email.setRecipient(customer.getEmail());
        email.setSubject("Auto Service Verification");
        email.setMsgBody("Your new verification code is: " + code);
        emailService.sendSimpleMail(email);

        return ResponseEntity.ok(
                "Verification code sent"
        );
    }


    @GetMapping("/me")
    public ResponseEntity<?> currentCustomer(
            Authentication authentication
    ) {
        String phone = authentication.getName();

        return repository.findByPhone(phone)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    
}