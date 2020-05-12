package com.rental.user;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "user")
public class User {
	
	@Id
	private int userid;
	
	private String username;
	private String fname;
	private String lname;
	private String emailaddr;
	private String phone;
	private String password;
	
	public User() {
		
	}


	public User(int userid, String username, String fname, String lname, String emailaddr, String phone,
			String password) {
		super();
		this.userid = userid;
		this.username = username;
		this.fname = fname;
		this.lname = lname;
		this.emailaddr = emailaddr;
		this.phone = phone;
		this.password = password;
	}


	public int getUserid() {
		return userid;
	}


	public void setUserid(int userid) {
		this.userid = userid;
	}


	public String getUsername() {
		return username;
	}


	public void setUsername(String username) {
		this.username = username;
	}


	public String getFname() {
		return fname;
	}


	public void setFname(String fname) {
		this.fname = fname;
	}


	public String getLname() {
		return lname;
	}


	public void setLname(String lname) {
		this.lname = lname;
	}


	public String getEmailaddr() {
		return emailaddr;
	}


	public void setEmailaddr(String emailaddr) {
		this.emailaddr = emailaddr;
	}


	public String getPhone() {
		return phone;
	}


	public void setPhone(String phone) {
		this.phone = phone;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}
	
	

	
	

}
