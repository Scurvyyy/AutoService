package com.example.auto_service.controller;

import com.example.auto_service.entity.PartItem;
import com.example.auto_service.repository.PartItemRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;
import java.io.IOException;


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
    
    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String uploadImage(@RequestParam("file") MultipartFile file)
            throws IOException {

        if (file.isEmpty() || file.getContentType() == null ||
                !List.of("image/jpeg", "image/png", "image/webp")
                    .contains(file.getContentType())) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, "Invalid image"
            );
        }

        Path folder = Paths.get("uploads").toAbsolutePath().normalize();
        Files.createDirectories(folder);

        String extension = switch (file.getContentType()) {
            case "image/png" -> ".png";
            case "image/webp" -> ".webp";
            default -> ".jpg";
        };

        String filename = UUID.randomUUID() + extension;
        Files.copy(file.getInputStream(), folder.resolve(filename));

        return "/uploads/" + filename;
    }

    @PutMapping("/{id}")
    public PartItem updatePart(
            @PathVariable Long id,
            @RequestBody PartItem updatedPart) {

        PartItem part = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Part not found"));

        part.setName(updatedPart.getName());
        part.setPrice(updatedPart.getPrice());
        part.setStock(updatedPart.getStock());
        part.setCategory(updatedPart.getCategory());
        part.setDescription(updatedPart.getDescription());
        part.setImage(updatedPart.getImage());

        return repository.save(part);
    }

    @DeleteMapping("/{id}")
    public void deletePart(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Part not found");
        }

        repository.deleteById(id);
    }
}