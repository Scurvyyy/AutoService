package com.example.auto_service.dto;

public class ResetPasswordRequest {
    private String email;
    private String code;
    private String newPassword;

    public String getCode (){
        return code;
    }

    public String getEmail (){
        return email;
    }

    public String newPassword (){
        return newPassword;
    }

    public void setCode (String code){
        this.code = code;
    }

    public void setEmail (String email){
        this.email = email;
    }

    public void setNewPassword (String newPassword){
        this.newPassword = newPassword;
    }

}