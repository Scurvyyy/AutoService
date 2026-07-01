package com.example.auto_service.controller;

import com.example.auto_service.entity.PartItem;
import com.example.auto_service.repository.PartItemRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parts")
@CrossOrigin(origins = "*")
public class PartItemController {

    private final PartItemRepository repository;

    public PartItemController(PartItemRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<PartItem> getAllParts() {
        return repository.findAll();
    }

    @PostMapping
    public PartItem createPart(@RequestBody PartItem partItem) {
        return repository.save(partItem);
    }
}