package com.rental.product;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="product")
public class Product {
	
	@Id
	private int id;
	
	private String name;
	
	private int age; //in months
	
	@Column(name="pdesc")
	private String desc;
	
	private String category;
	
	private int duration; //in days
	
	private String doa;
	
	int price; //per day
	
	public Product() {
		
	}
	
	public Product(int id, String name, int age, String desc, String category, String doa, int duration, int price) {
		super();
		this.id = id;
		this.name = name;
		this.age = age;
		this.desc = desc;
		this.category = category;
		this.doa = doa;
		this.duration = duration;
		this.price = price;
	}

	
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getDoa() {
		return doa;
	}

	public void setDoa(String doa) {
		this.doa = doa;
	}

	public int getDuration() {
		return duration;
	}

	public void setDuration(int duration) {
		this.duration = duration;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	
	
	
	
	

}



