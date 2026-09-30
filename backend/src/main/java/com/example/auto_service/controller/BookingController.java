package com.example.auto_service.controller;

import com.example.auto_service.entity.Booking;
import com.example.auto_service.repository.BookingRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(
    origins = "*",
    allowedHeaders = "*",
    methods = {
        RequestMethod.GET,
        RequestMethod.POST,
        RequestMethod.PUT,
        RequestMethod.DELETE,
        RequestMethod.OPTIONS
    }
)
public class BookingController {

    private final BookingRepository repository;

    public BookingController(BookingRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Booking> getAllBookings() {
        return repository.findAll();
    }

     @GetMapping("/phone/{phone}")
    public List<Booking> getBookingsByPhone(@PathVariable String phone) {
        return repository.findByCustomerPhoneOrderByIdDesc(phone);
    }

    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {
        return repository.save(booking);
    }

    @PostMapping("/{id}/cancel")
    public Booking cancelBooking(@PathVariable Long id) {

        Booking booking = repository.findById(id) .orElseThrow();

        booking.setStatus("Cancelled");

        return repository.save(booking);
    }

    @PostMapping("/{id}/complete")
    public Booking completeBooking(@PathVariable Long id) {

        Booking booking = repository.findById(id).orElseThrow();

        booking.setStatus("Completed");

        return repository.save(booking);
    }

    @PutMapping("/{id}/assign")
    public Booking assignMechanic(
            @PathVariable Long id,
            @RequestParam String mechanic
    ) {

        Booking booking = repository.findById(id).orElseThrow();

        booking.setMechanic(mechanic);

        booking.setStatus("Assigned");

        return repository.save(booking);
    }

   
}