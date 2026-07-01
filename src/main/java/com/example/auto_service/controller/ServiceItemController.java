package com.example.auto_service.controller;

import com.example.auto_service.entity.ServiceItem;
import com.example.auto_service.repository.ServiceItemRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "*")
public class ServiceItemController {

    private final ServiceItemRepository repository;

    public ServiceItemController(ServiceItemRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<ServiceItem> getAllServices() {
        return repository.findAll();
    }

    @PostMapping
    public ServiceItem createService(@RequestBody ServiceItem serviceItem) {
        return repository.save(serviceItem);
    }
}