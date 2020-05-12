package com.rental.user.content;

import java.io.Serializable;

public class UserContentId implements Serializable {
	
	private static final long serialVersionUID = 1L;
	private int user_id;
	private int product_id;
	
	public UserContentId() {
		
	}

	public UserContentId(int user_id, int product_id) {
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
	
	@Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UserContentId that = (UserContentId) o;

        if (user_id!=that.user_id) return false;
        return true;
    }

    @Override
    public int hashCode() {
        int result = 0;
        //result = 31 * result + product_id.hashCode();
        return result;
    }
	
	

}
