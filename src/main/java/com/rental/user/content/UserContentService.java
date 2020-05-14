package com.rental.user.content;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rental.handler.CustomException;
import com.rental.product.Product;
import com.rental.product.ProductService;
import com.rental.user.User;

@Service
public class UserContentService {
	
	@Autowired
	private UserContentRepository userContentRepo;
	
	@Autowired ProductService productService;
	
	public boolean addProductOfUser(Product product, User user) {
		
		UserContent userContent = new UserContent(user.getUserid(), product.getId());
		
		//System.out.println("In User Content Service " + userContent.getUser_id() + " " + userContent.getProduct_id());
		userContentRepo.save(userContent);
		
		return true;
	}
	
	
	public ArrayList<Product> getListOfProductsForUser(User user, ArrayList<Product> catList) throws CustomException{
		ArrayList<UserContent> list = userContentRepo.getUserContentForUser(user.getUserid());
		
		ArrayList<Product> prodList = new ArrayList<Product>();
		for(int i=0;i<list.size();i++) {
			prodList.add(productService.getProductDetails(list.get(i).getProduct_id()));
		}
		
		prodList.retainAll(catList);
		
		return prodList;
		
	}
}