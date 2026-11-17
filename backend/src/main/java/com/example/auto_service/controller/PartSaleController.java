package com.example.auto_service.controller;

import com.example.auto_service.entity.PartItem;
import com.example.auto_service.entity.PartSale;
import com.example.auto_service.repository.PartItemRepository;
import com.example.auto_service.repository.PartSaleRepository;

import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/part-sales")
@CrossOrigin(origins = "http://localhost:5173")
public class PartSaleController {

    private final PartSaleRepository saleRepository;
    private final PartItemRepository partRepository;

    public PartSaleController(
            PartSaleRepository saleRepository,
            PartItemRepository partRepository) {

        this.saleRepository = saleRepository;
        this.partRepository = partRepository;
    }

    @GetMapping
    public List<PartSale> getAllSales() {
        return saleRepository.findAll();
    }

    @PostMapping
    @Transactional
    public PartSale recordSale(@RequestBody PartSale request) {

        if (request.getPartId() == null || request.getQuantity() == null ||
            request.getQuantity() <= 0) {

            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Invalid part or quantity"
            );
        }

        PartItem part = partRepository.findById(request.getPartId())
            .orElseThrow(() -> new ResponseStatusException( HttpStatus.NOT_FOUND, "Part not found"));

        if (part.getStock() == null || part.getStock() < request.getQuantity()) {

            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Not enough stock"
            );
        }

        if (part.getPrice() == null || part.getPrice() < 0) {
            throw new ResponseStatusException(  HttpStatus.BAD_REQUEST, "Invalid part price");
        }

        part.setStock(part.getStock() - request.getQuantity());

        PartSale sale = new PartSale();
        sale.setPartId(part.getId());
        sale.setQuantity(request.getQuantity());
        sale.setUnitPrice(part.getPrice());
        sale.setSoldAt(LocalDateTime.now());

        partRepository.save(part);

        return saleRepository.save(sale);
    }
}
