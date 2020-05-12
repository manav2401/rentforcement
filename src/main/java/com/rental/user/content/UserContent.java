package com.rental.user.content;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

@Entity
@Table(name="user_content")
@IdClass(UserContentId.class)
public class UserContent{
	
	@Id
	private int user_id;
	
	@Id
	private int product_id;
	
	public UserContent() {
		
	}

	public UserContent(int user_id, int product_id) {
		super();
		this.user_id = user_id;
		this.product_id = product_id;
	}

	public int getUser_id() {
		return user_id;
	}

	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}

	public int getProduct_id() {
		return product_id;
	}

	public void setProduct_id(int product_id) {
		this.product_id = product_id;
	}
	
	

}
