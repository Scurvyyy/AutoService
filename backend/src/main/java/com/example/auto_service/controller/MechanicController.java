package com.example.auto_service.controller;

import com.example.auto_service.entity.Mechanic;
import com.example.auto_service.repository.MechanicRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/mechanics")
@CrossOrigin(origins = "*")
public class MechanicController {

    private final MechanicRepository repository;

    public MechanicController(
            MechanicRepository repository
    ) {
        this.repository = repository;
    }

    @GetMapping
    public List<Mechanic> getAllMechanics() {
        return repository.findAll();
    }

    @PostMapping
    public Mechanic createMechanic(@RequestBody Mechanic mechanic) {
        return repository.save(mechanic);
    }

    @DeleteMapping("/{id}")
    public void deleteMechanic(@PathVariable Long id){
        repository.deleteById(id);
    }

    @PutMapping("/{id}")
    public Mechanic updateMechanic(
            @PathVariable Long id,
            @RequestBody Mechanic updatedMechanic
    ) {

        Mechanic mechanic = repository.findById(id).orElseThrow();


        mechanic.setName(updatedMechanic.getName());
        mechanic.setPhone(updatedMechanic.getPhone());
        mechanic.setAddress(updatedMechanic.getAddress());
        mechanic.setMajor(updatedMechanic.getMajor());

        return repository.save(mechanic);
    }
}