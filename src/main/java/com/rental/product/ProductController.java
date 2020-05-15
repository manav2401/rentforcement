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
import com.rental.product.visual.ProductImage;
import com.rental.product.visual.ProductVisualService;
import com.rental.user.User;
import com.rental.user.UserService;
import com.rental.user.content.UserContentService;

@RestController
@CrossOrigin(origins = "*")
public class ProductController {
	
	@Autowired
	private ProductService productServ;
	
	@Autowired 
	private ProductVisualService productVisualService;

	@Autowired 
	private UserService userService;
	
	@Autowired
	private UserContentService userContentService;
	
	@RequestMapping(method = RequestMethod.POST, value="/addProduct")
	public ResponseEntity<Integer> addProduct(@RequestBody Product product, @RequestHeader(name = "token") String username) throws JsonProcessingException{
		
		ObjectMapper map = new ObjectMapper();
		System.out.println("User name obtained is " + username );

		if (productServ.checkIfUserExists(username)) {
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
			
		} else {
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

	@RequestMapping(method = RequestMethod.GET, value = "/productImg/{id}")
	public ResponseEntity<ProductImage> getProductDetailsWithImages(@PathVariable int id) throws CustomException{
		Product prod = productServ.getProductDetails(id);
		ProductImage productImage = null;
		if(prod != null) {
			productImage = productVisualService.getProductDetailswithImage(prod);
			return new ResponseEntity<ProductImage>(productImage, HttpStatus.OK);
		}
		else {
			return new ResponseEntity<ProductImage>(productImage, HttpStatus.NO_CONTENT);
		}
		
		
	}

	@RequestMapping( method = RequestMethod.PUT, value = "/updateProduct")
	public ResponseEntity<String> updateProduct(@RequestBody Product product) throws JsonProcessingException{
		ObjectMapper map = new ObjectMapper();
		String jsonString;
		if(productServ.updateProduct(product)) {
			
			jsonString = map.writeValueAsString("Product Updated");
			return new ResponseEntity<String>(jsonString, HttpStatus.OK);
		}
		else {
			jsonString = map.writeValueAsString("Product Could not be Updated");
			return new ResponseEntity<String>(jsonString, HttpStatus.CONFLICT);
		}
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/products/{category}")
	public ResponseEntity<ArrayList<Product>> getProductListByCategory(@PathVariable String category, @RequestHeader( name = "username") String username) throws CustomException{
		ArrayList<Product> list = new ArrayList<Product>();
		if(category.equals("all")) {
			list = productServ.getPoductList();
		}
		else {	
			list = productServ.getProductListByCategory(category);
		}	
		if(list.size()>0) {
			if (!username.equals("@")) {
				User user = userService.getUserByUsername(username);
				list = userContentService.getListOfProductsForUser(user, list);			
			}
			return new ResponseEntity<ArrayList<Product>>(list, HttpStatus.OK);	
		}
		else {
			
			return new ResponseEntity<ArrayList<Product>>(list, HttpStatus.NO_CONTENT);
		}
		
	}

	@RequestMapping(method = RequestMethod.GET, value = "/productImgs/{category}")
	public ResponseEntity<ArrayList<ProductImage>> getProductListWithImagesByCategory(@PathVariable String category, @RequestHeader( name = "username") String username) throws CustomException{
		ArrayList<Product> list = new ArrayList<Product>();
		ArrayList<ProductImage> del = new ArrayList<ProductImage>();
		if(username.equals("@")) {
			if(category.equals("all")) {
				//System.out.println("All products found");
				list = productServ.getPoductList();
			}
			else {	
				list = productServ.getProductListByCategory(category);
			}	
			
			del = productVisualService.sendPackets(list);
		}
		else {
			if(category.equals("all")) {
				//System.out.println("All products found");
				list = productServ.getPoductList();
			}
			else {	
				list = productServ.getProductListByCategory(category);
			}	
			User user = userService.getUserByUsername(username);
			list = userContentService.getListOfProductsForUser(user, list);
			del = productVisualService.sendPackets(list);
			
			
		}
		if(del.size()>0) {
			return new ResponseEntity<ArrayList<ProductImage>>(del, HttpStatus.OK);
		}
		else {
			return new ResponseEntity<ArrayList<ProductImage>>(del, HttpStatus.NO_CONTENT);
		}
		
	}
	
	
	@RequestMapping(method = RequestMethod.POST, value = "/image/upload")
	public ResponseEntity<String> uploadProductImage(@RequestParam("file") MultipartFile file, @RequestHeader( name = "productId") String strProductId) throws JsonProcessingException{
		
		ObjectMapper map = new ObjectMapper();
		//ArrayList<MultipartFile> files = map.readValue(jsonFiles, new TypeReference<ArrayList<MultipartFile>>() {});
		//map.convertValue(map.readValue(jsonFiles, ArrayList.class), (TypeReference<ArrayList<MultipartFile>>) new TypeReference<ArrayList<MultipartFile>>());
		System.out.println("Product Image upload called ") ;
		int productId = Integer.valueOf(strProductId);
		productVisualService.fileUpload(file, productId);
		String jsonString;
		jsonString =  map.writeValueAsString("Product added");
		return new ResponseEntity<String>(jsonString, HttpStatus.OK);
		
	}

	@RequestMapping(method = RequestMethod.GET, value = "/image/:productId")
	public ResponseEntity<String> getImageListForProductList(@PathVariable("productId") int productId){
		
			String image = productVisualService.getImageForProduct(productId);
			return new ResponseEntity<String>(image, HttpStatus.OK);
		
		
		
		
	}
	
	@RequestMapping( method = RequestMethod.GET, value = "/testing")
	public ResponseEntity<ArrayList<ProductImage>> testing(){
		
		ArrayList<Product> list = new ArrayList<Product>();
		ArrayList<ProductImage> del = new ArrayList<ProductImage>();
		list = productServ.getPoductList();
		del = productVisualService.sendPackets(list);
		return new ResponseEntity<ArrayList<ProductImage>>(del, HttpStatus.OK);
	}


}