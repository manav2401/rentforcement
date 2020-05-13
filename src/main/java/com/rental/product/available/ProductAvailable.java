package com.rental.product.available;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "product_available")
public class ProductAvailable {
	
	@Id
	private int id;

	@Column(name = "enddate")
	private String enddate;

	public ProductAvailable(int id, String enddate) {
		this.id = id;
		this.enddate = enddate;
	}

	public ProductAvailable(String enddate) {
		this.enddate = enddate;
	}

	public ProductAvailable() {
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getEnddate() {
		return enddate;
	}

	public void setEnddate(String enddate) {
		this.enddate = enddate;
	}


	

}
