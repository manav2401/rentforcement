package com.rental.user.cart;

import java.util.ArrayList;
import java.util.Iterator;

import com.rental.handler.CustomException;
import com.rental.product.Product;
import com.rental.product.ProductRepository;
import com.rental.user.UserRepository;
import com.rental.user.UserService;
import com.rental.user.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    public Boolean addProductToCart(int userId, int productId) {
        // System.out.println("USER ID: " + userId + " and Product ID: " + productId);
        if (userRepository.existsById(userId) && productRepository.existsById(productId)) {
            Cart cart = new Cart(userId, productId);
            // System.out.println("Cart Object: " + cart.toString());
            cartRepository.save(cart);
            return true;
        } else {
            return false;
        }
    }

    public boolean checkIfUserExists(String username) {
        ArrayList<User> list = userRepository.findByUsername(username);
        if (list.size() == 0) {
            return false;
        } else {
            return true;
        }
    }

    public int getUserIdFromUsername(String username) {
        // Assuming user already exits

        ArrayList<User> list = userRepository.findByUsername(username);
        return list.get(0).getUserid();
    }

    public ArrayList<Product> fetchCartProducts(int userId) throws CustomException {

        ArrayList<Product> output = new ArrayList<Product>();
        ArrayList<Cart> cartEntries = new ArrayList<Cart>();
        cartEntries = cartRepository.findAllByUserid(userId);

        for (Cart i : cartEntries) {
            Product temp = productRepository.findById(i.getProductid()).get();
            output.add(temp);
        }

        return output;
        /*
        ArrayList<Product> products = new ArrayList<Product>();
        ArrayList<Cart> allProducts = new ArrayList<Cart>();
        allProducts = cartRepository.findAllByUserid(userId);

        for (Cart cart : allProducts) {
            System.out.println("CART ID: " + cart.getId());
            System.out.println("PRODUCT ID: " + cart.getProductid());
            Product temp = getProductDetails(cart.getProductid());
            products.add(temp);
        }
        return products;*/
        /*ArrayList<Product> output = new ArrayList<Product>();
        Iterator<Product> it = productRepository.findAll().iterator();
		while(it.hasNext()) {
			output.add(it.next());
        }
        return output;*/
    }

    public boolean removeProductFromCart(int userId, int productId) {

        if (userRepository.existsById(userId) && productRepository.existsById(productId)) {
            ArrayList<Cart> cart = new ArrayList<Cart>();
            cart = cartRepository.findAllByUserid(userId);
            int flag = 0; 
            for (Cart i : cart) {
                if (i.getProductid()==productId) {
                    System.out.println(i.toString());
                    cartRepository.delete(i);
                    flag  = 1;
                    break;
                }
            }

            if (flag==0) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    } 

    public Boolean emptyCart(int userId) {
        ArrayList<Cart> cart = new ArrayList<Cart>();
        cart = cartRepository.findAllByUserid(userId);
        for (Cart i : cart) {
            cartRepository.delete(i);
        }
        return true;
    }

}