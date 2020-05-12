package com.rental.product;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.rental.handler.CustomException;
import com.rental.product.visual.ProductVisualService;

@RestController
@CrossOrigin(origins = "*")
public class ProductController {
	
	@Autowired
	private ProductService productServ;
	
	@Autowired ProductVisualService productVisualService;
	
	@RequestMapping(method = RequestMethod.POST, value="/addProduct")
	public ResponseEntity<Integer> addProduct(@RequestBody Product product, @RequestHeader(name = "token") String username) throws JsonProcessingException{
		
		ObjectMapper map = new ObjectMapper();
		System.out.println("User name obtained is " + username );
		
		String jsonString;
		int val = productServ.addProduct(product, username); 
		if( val > 0 ) {
			jsonString =  map.writeValueAsString("Product added");
			
			return new ResponseEntity<Integer>(val, HttpStatus.OK);
			
		}
		else {
			jsonString =  map.writeValueAsString("Product cannot be added");
			return new ResponseEntity<Integer>(-1, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/products")
	public ResponseEntity<ArrayList<Product>> getProductList(){
		
		ArrayList<Product> list = new ArrayList<Product>();
		list= productServ.getPoductList();
		if(list.size()>0) {
			return new ResponseEntity<ArrayList<Product>>(list, HttpStatus.OK);
		}
		else {
			return new ResponseEntity<ArrayList<Product>>(list, HttpStatus.NO_CONTENT);
		}
		
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/product/{id}")
	public ResponseEntity<Product> getProductDetails(@PathVariable int id) throws CustomException{
		Product prod = productServ.getProductDetails(id);
		if(prod != null) {
			return new ResponseEntity<Product>(prod, HttpStatus.OK);
		}
		else {
			return new ResponseEntity<Product>(prod, HttpStatus.NO_CONTENT);
		}
		
		
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/products/{category}")
	public ResponseEntity<ArrayList<Product>> getProductListByCategory(@PathVariable String category){
		ArrayList<Product> list = new ArrayList<Product>();
		if(category.equals("all")) {
			//System.out.println("All products found");
			list = productServ.getPoductList();
		}
		else {	
			list = productServ.getProductListByCategory(category);
		}	
		if(list.size()>0) {
			//System.out.println("Products Found by category");
			return new ResponseEntity<ArrayList<Product>>(list, HttpStatus.OK);
		}
		else {
			
			return new ResponseEntity<ArrayList<Product>>(list, HttpStatus.NO_CONTENT);
		}
		
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/image/upload")
	public ResponseEntity<String> uploadProductImage(@RequestParam("file") MultipartFile file, @RequestHeader( name = "productId") String strProductId) throws JsonProcessingException{
		
		System.out.println("Product Image upload called");
		int productId = Integer.valueOf(strProductId);
		productVisualService.fileUpload(file, productId);
		ObjectMapper map = new ObjectMapper();
		String jsonString;
		jsonString =  map.writeValueAsString("Product added");
		return new ResponseEntity<String>(jsonString, HttpStatus.OK);
		
	}

}
