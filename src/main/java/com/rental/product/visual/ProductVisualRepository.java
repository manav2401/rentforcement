package com.rental.product.visual;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductVisualRepository extends CrudRepository<ProductVisual, ProductVisualId>{

}
