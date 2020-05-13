package com.rental.user.order;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "order_table")
public class Order {

    private static final long serialVersionUID = -8850740904859933967L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "userid")
    private int userid;

    @Column(name = "prodid")
    private int prodid;

    @Column(name = "start_date")
    private String startDate;

    @Column(name = "end_date")
    private String endDate;

    @Column(name = "amount")
    private int amount;

    @Column(name = "user_address")
    private String UserAddress;

    @Column(name = "order_status")
    private String orderStatus;

    public Order(int id, int userid, int productid, String startDate, String endDate, int amount, String userAddress,
        String orderStatus) {
        this.id = id;
        this.userid = userid;
        this.prodid = productid;
        this.startDate = startDate;
        this.endDate = endDate;
        this.amount = amount;
        UserAddress = userAddress;
        this.orderStatus = orderStatus;
    }

    public Order(int userid, int productid, String startDate, String endDate, int amount, String userAddress,
        String orderStatus) {
        this.userid = userid;
        this.prodid = productid;
        this.startDate = startDate;
        this.endDate = endDate;
        this.amount = amount;
        UserAddress = userAddress;
        this.orderStatus = orderStatus;
    }

    public Order() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserid() {
        return userid;
    }

    public void setUserid(int userid) {
        this.userid = userid;
    }

    public int getProdid() {
        return prodid;
    }

    public void setProdid(int productid) {
        this.prodid = productid;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getUserAddress() {
        return UserAddress;
    }

    public void setUserAddress(String userAddress) {
        UserAddress = userAddress;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }

    @Override
    public String toString() {
        return "Order [UserAddress=" + UserAddress + ", amount=" + amount + ", endDate=" + endDate + ", id=" + id
                + ", orderStatus=" + orderStatus + ", productid=" + prodid + ", startDate=" + startDate + ", userid="
                + userid + "]";
    }


}