package com.example.auto_service.repository;

import com.example.auto_service.entity.ServiceItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceItemRepository extends JpaRepository<ServiceItem, Long> {
}