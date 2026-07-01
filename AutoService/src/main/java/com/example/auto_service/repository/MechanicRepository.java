package com.example.auto_service.repository;

import com.example.auto_service.entity.Mechanic;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MechanicRepository extends JpaRepository<Mechanic, Long> {
}