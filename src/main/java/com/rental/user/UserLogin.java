package com.rental.user;

public class UserLogin {

    private String credential;
    private String password;

    public UserLogin(String credential, String password) {
        this.credential = credential;
        this.password = password;
    }

    public UserLogin() {
    }

    public String getCredential() {
        return credential;
    }

    public void setCredential(String credential) {
        this.credential = credential;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "UserLogin [credential=" + credential + ", password=" + password + "]";
    }

}