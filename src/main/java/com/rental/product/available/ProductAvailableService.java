package com.rental.product.available;

import com.rental.user.UserRepository;
import com.rental.user.UserService;

import java.util.ArrayList;
import java.util.Iterator;

import com.rental.user.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductAvailableService {

    @Autowired
    private ProductAvailableRepository productAvailableRepository;

    @Autowired
    private UserService userService;

    public int getLatestProductId() {
		ArrayList<ProductAvailable> list = new ArrayList<ProductAvailable>();
		Iterator<ProductAvailable> it = productAvailableRepository.findAll().iterator();
		while(it.hasNext()) {
			list.add(it.next());
		}
		int max = 0;
		for(int i = 0;i < list.size(); i++) {
			if(list.get(i).getId() > max) {
				max = list.get(i).getId(); 
			}
		}
		return max + 1;
	}

    public Boolean addProductAvailability(String date, String username) {
        if (userService.checkIfUserExists(username)) {
            int productId = getLatestProductId();
            ProductAvailable pa = new ProductAvailable(productId, date);
            productAvailableRepository.save(pa);
            return true;
        } else {
            return false;
        }
    }

    public ProductAvailable getAvailability(int id) {
        ProductAvailable pA = new ProductAvailable();
        pA = productAvailableRepository.findById(id).get();
        return pA;
    }

    public Boolean updateProductAvailability(ProductAvailable pA, String username) {
        if (userService.checkIfUserExists(username)) {
            productAvailableRepository.save(pA);
            return true;
        } else {
            return false;
        }
    }

}