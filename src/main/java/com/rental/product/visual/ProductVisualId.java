package com.rental.product.visual;

import java.io.Serializable;

public class ProductVisualId implements Serializable{
	

	private static final long serialVersionUID = 1L;
	private int id;
	private String link;
	
	public ProductVisualId() {
		
	}

	public ProductVisualId(int id, String link) {
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
	
	@Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ProductVisualId that = (ProductVisualId) o;

        if (id!=that.id) return false;
        return link.equals(that.link);
    }

    @Override
    public int hashCode() {
        int result = 0;
        result = 31 * result + link.hashCode();
        return result;
    }
	
	

}
