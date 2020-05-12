package com.rental.user.cart;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "cart")
public class Cart {    

    @Id
    private int id;

    @Column(name = "userid")
    private int userid;

    @Column(name = "productid")
    private int productid;

    public Cart() {
        
    }

    public Cart(int userid, int productid) {
        this.userid = userid;
        this.productid = productid;
    }

    public int getUserid() {
        return userid;
    }

    public void setUserid(int userid) {
        this.userid = userid;
    }

    public int getProductid() {
        return productid;
    }

    public void setProductid(int productid) {
        this.productid = productid;
    }

    @Override
    public String toString() {
        return "Cart [id=" + id + ", productid=" + productid + ", userid=" + userid + "]";
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

}