package com.example.auto_service.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "mechanics")
public class Mechanic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    
    private Long id;
    private String name;
    private String phone;
    private String address;
    private String major;

    public Mechanic() {
    }

    public Mechanic(
            String name,
            String phone,
            String address,
            String major
    ) {
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.major = major;
    }

    public long getId () {
        return id;
    }

    public String getName (){
        return name;
    }

    public String getPhone (){
        return phone;
    }

    public String getAddress (){
        return address;
    }

    public String getMajor(){
        return major;
    }

    public void setName(String name){
        this.name = name;
    }

    public void setPhone(String phone){
        this.phone = phone;
    }

    public void setAddress(String address){
        this.address= address;
    }

    public void setMajor(String major){
        this.major = major;
    }
    
    public void setId(Long id){
        this.id = id;
    }

}