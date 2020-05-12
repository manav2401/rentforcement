package com.rental.user.content;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rental.product.Product;
import com.rental.user.User;

@Service
public class UserContentService {
	
	@Autowired
	private UserContentRepository userContentRepo;
	
	public boolean addProductOfUser(Product product, User user) {
		
		UserContent userContent = new UserContent(user.getUserid(), product.getId());
		
		//System.out.println("In User Content Service " + userContent.getUser_id() + " " + userContent.getProduct_id());
		userContentRepo.save(userContent);
		
		return true;
	}
}
