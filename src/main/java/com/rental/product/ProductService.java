package com.rental.product;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Iterator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import com.rental.handler.CustomException;
import com.rental.user.User;
import com.rental.user.UserRepository;
import com.rental.user.UserService;
import com.rental.user.content.UserContentService;

@Service
public class ProductService {
	
	@Autowired
	private ProductRepository productRepo;
	
	@Autowired
	private UserContentService userContentService;
	
	@Autowired 
	private UserService userService;

	public int addProduct(Product prod, String username) {
		
		if(this.validateProduct(prod)) {
			
			System.out.println(prod.getId());
			prod.setId(this.getProductId());
			
			User user = userService.getUserByUsername(username);
			
			if(userContentService.addProductOfUser(prod, user)) {
				productRepo.save(prod);
				return prod.getId();
			}
			else {
				return -1;
			}
		}
		else {
			return -1;
		}
		
	}

	public boolean checkIfUserExists(String username) {
		return userService.checkIfUserExists(username);
    }
	
	public ArrayList<Product> getPoductList(){
		ArrayList<Product> list = new ArrayList<Product>();
		Iterator<Product> it =  productRepo.findAll().iterator();
		
		while(it.hasNext()) {
			list.add((Product)it.next());
		}
		return list;
		
	}
	
	
	public Product getProductDetails(int id) throws CustomException {
		if(productRepo.existsById(id)) {
			 return productRepo.findById(id).get();
		}
		else {
			throw new CustomException("Entity Not Found");
		}
		
	}
	
	public ArrayList<Product> getProductListByCategory(String category){
		ArrayList<Product> tempList = new ArrayList<Product>();
		ArrayList<Product> list = new ArrayList<Product>();
		Iterator<Product> it = productRepo.findAll().iterator();
		while(it.hasNext()) {
			tempList.add(it.next());
		}
		for(int i = 0 ; i < tempList.size() ; i++) {
			if(tempList.get(i).getCategory().equals(category)) {
				list.add(tempList.get(i));
			}
		}
		return list;
	}
	
	public int getProductId() {
		ArrayList<Product> list = new ArrayList<Product>();
		Iterator<Product> it = productRepo.findAll().iterator();
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
	
	public boolean validateProduct(Product prod) {
		return true;
	}

	public boolean updateProduct(Product prod) {
		if(productRepo.existsById(prod.getId())) {
			productRepo.save(prod);
			return true;
		}
		else {
			return false;
		}
	}
	
}
