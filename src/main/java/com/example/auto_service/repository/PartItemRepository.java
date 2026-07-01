package com.example.auto_service.repository;

import com.example.auto_service.entity.PartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PartItemRepository extends JpaRepository<PartItem, Long> {
}