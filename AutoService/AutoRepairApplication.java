package com.example.autorepair;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AutoRepairApplication {
    public static void main(String[] args) {
        SpringApplication.run(AutoRepairApplication.class, args);
    }

    @Bean
    CommandLineRunner runner(BCryptPasswordEncoder encoder) {
        return args -> {
            System.out.println("Admin password hash:");
            System.out.println(encoder.encode("admin123"));
        };
    }
}