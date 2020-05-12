package com.rental.user.cart;

import java.util.ArrayList;

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
        System.out.println("USER ID: " + userId + " and Product ID: " + productId);
        if (userRepository.existsById(userId) && productRepository.existsById(productId)) {
            Cart cart = new Cart(userId, productId);
            System.out.println("Cart Object: " + cart.toString());
            cartRepository.save(cart);
            return true;
        } else {
            return false;
        }
    }

    public boolean checkIfUserExists(String username) {
        ArrayList<User> list = userRepository.findByUsername(username);
        if (list.size()==0) {
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

    public ArrayList<Product> fetchCartProducts(int userId) {

        ArrayList<Product> products = new ArrayList<Product>();
        ArrayList<Cart> allProducts = new ArrayList<Cart>();
        allProducts = cartRepository.findAllByUserid(userId);

        ArrayList<Integer> proIds = new ArrayList<Integer>();
        for (Cart cart : allProducts) {
            proIds.add(cart.getProductid());
        }

        products = (ArrayList<Product>) productRepository.findAllById(proIds);
        return products;
        
    }



}