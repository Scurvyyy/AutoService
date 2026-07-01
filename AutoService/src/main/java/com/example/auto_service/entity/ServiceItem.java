package com.example.auto_service.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "services")
public class ServiceItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Double price;

    public ServiceItem() {}

    public Long getId() { return id; }
    public String getName() { return name; }
    public Double getPrice() { return price; }

    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setPrice(Double price) { this.price = price; }
}