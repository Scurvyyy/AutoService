package com.example.auto_service.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*;

@Entity
@Table(name = "customers")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String phone;
    private boolean verified = false ;

    @Column(unique = true)
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String verifCode;
    
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String resetCode;

    public Customer() {
    }

    public Customer(String name, String phone, String email, String password) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getPhone() {
        return phone;
    }

    public String getEmail() {
        return email;
    }
    
    public String getPassword() {
        return password;
    }

    public String getVerifCode(){
        return verifCode;
    }

    public String getResetCode(){
        return resetCode;
    }

    public boolean isVerified() {
    return verified;
    }   
    

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setVerifCode(String verifCode) {
        this.verifCode = verifCode;
    }

    public void setVerified(boolean verified) {
    this.verified = verified;
    }

    public void setResetCode(String resetCode) {
    this.resetCode = resetCode;
}

}