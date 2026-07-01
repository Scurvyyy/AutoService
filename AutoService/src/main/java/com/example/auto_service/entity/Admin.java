package com.example.auto_service.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "admins")
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userName;

    @Column(unique = true)
    private String phone;
    
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    public Admin() {}

    public Long getId() {
        return id;
    }

    public String getuserName() {
        return userName;
    }

    public void setName(String userName) {
        this.userName = userName;
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}