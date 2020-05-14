package com.rental.product.visual;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductVisualRepository extends CrudRepository<ProductVisual, ProductVisualId>{
	
	@Query(nativeQuery = true, value = "select * from product_visual where id = ?1")
	public ArrayList<ProductVisual> getProductImage(@Param("product_id") int product_id);
	
	

}
