package com.rental.product.available;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductAvailableRepository extends CrudRepository<ProductAvailable, Integer>{

}
