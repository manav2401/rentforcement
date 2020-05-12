package com.rental.product.visual;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

@Entity
@Table(name="product_visual")
@IdClass(ProductVisualId.class)
public class ProductVisual {
	
	@Id
	private int id;
	
	@Id
	private String link;
	
	public ProductVisual() {
		
	}

	public ProductVisual(int id, String link) {
		super();
		this.id = id;
		this.link = link;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
	}
	
	
	
	

}
