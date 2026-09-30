package com.example.auto_service.repository;

import com.example.auto_service.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Optional<Customer> findByPhone(String phone);
    Optional<Customer> findByEmail(String email);
    
}