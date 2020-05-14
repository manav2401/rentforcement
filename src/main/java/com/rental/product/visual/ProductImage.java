package com.rental.product.visual;

import com.rental.product.Product;

public class ProductImage {
	
	private Product product;
	private String image;
	
	public ProductImage(Product product, String image) {
		super();
		this.product = product;
		this.image = image;
	}
	
	public ProductImage() {
		
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}
	
	
	
	

}
