package com.example.auto_service.controller;

import com.example.auto_service.dto.EmailDetails;
import com.example.auto_service.dto.ForgotPasswordRequest;
import com.example.auto_service.dto.LoginRequest;
import com.example.auto_service.dto.LoginResponse;
import com.example.auto_service.dto.VerifyRequest;
import com.example.auto_service.entity.Customer;
import com.example.auto_service.repository.CustomerRepository;
import com.example.auto_service.service.EmailService;


import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "*")
public class CustomerController {

    private final CustomerRepository repository;
    private final EmailService emailService;
    private final BCryptPasswordEncoder passwordEncoder;

    public CustomerController(CustomerRepository repository,
         EmailService emailService, BCryptPasswordEncoder passwordEncoder) 
        {
        this.repository = repository;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
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

            LoginResponse response = new LoginResponse(
                customer.getId(),
                customer.getName(),
                customer.getEmail(),
                customer.isVerified()
        );

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
    public ResponseEntity<Customer> login(
            @RequestBody LoginRequest request){

        Customer customer =
            repository.findByPhone(request.getPhone())
                    .orElse(null);

        if(customer != null &&
            passwordEncoder.matches(request.getPassword(), customer.getPassword())
        ) {

            if(!customer.isVerified()) {

                return ResponseEntity
                        .status(403)
                        .build();
            }

            LoginResponse response = new LoginResponse(
                customer.getId(),
                customer.getName(),
                customer.getEmail(),
                customer.isVerified()
        );

            return ResponseEntity.ok(customer);
        }

        return ResponseEntity.badRequest().build();
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
    
}