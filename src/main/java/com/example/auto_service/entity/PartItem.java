package com.example.auto_service.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "parts")
public class PartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Double price;
    private Integer stock;
    private String description;

    public PartItem() {
    }

    public PartItem(String name, Double price, Integer stock, String description) {
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.description = description;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public Double getPrice() { return price; }
    public Integer getStock() { return stock; }
    public String getDescription() { return description; }

    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setPrice(Double price) { this.price = price; }
    public void setStock(Integer stock) { this.stock = stock; }
    public void setDescription(String description) { this.description = description; }
}