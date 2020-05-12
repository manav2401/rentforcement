package com.rental.product.available;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "product_available")
public class ProductAvailable {
	
	@Id
	private int id;
	
	private boolean available;
	
	public ProductAvailable() {
		
	}

	public ProductAvailable(int id, boolean available) {
		super();
		this.id = id;
		this.available = available;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public boolean isAvailable() {
		return available;
	}

	public void setAvailable(boolean available) {
		this.available = available;
	}
	
	
	

}
