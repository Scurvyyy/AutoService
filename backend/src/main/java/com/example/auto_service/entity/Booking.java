package com.example.auto_service.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;
    private String customerPhone;
    private String serviceName;
    private LocalDate bookingDate;
    private String status;
    private String mechanic;

    public Booking() {
    }

    public Booking(String customerName, String customerPhone, String serviceName, LocalDate bookingDate, String status, String mechanic) {
        this.customerName = customerName;
        this.customerPhone = customerPhone;
        this.serviceName = serviceName;
        this.bookingDate = bookingDate;
        this.status = status;
        this.mechanic = mechanic;
    }

    public Long getId() {
        return id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public String getCustomerPhone() {
        return customerPhone;
    }

    public String getServiceName() {
        return serviceName;
    }

    public LocalDate getBookingDate() {
        return bookingDate;
    }

    public String getStatus() {
        return status;
    }

    public String getMechanic(){
        return mechanic;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public void setBookingDate(LocalDate bookingDate) {
        this.bookingDate = bookingDate;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setMechanic(String mechanic) {
        this.mechanic = mechanic;
    }
}