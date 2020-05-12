package com.rental.user.cart;

import com.rental.product.ProductRepository;
import com.rental.user.UserRepository;

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
        if (userRepository.existsById(userId) && productRepository.existsById(productId)) {
            Cart cart = new Cart(userId, productId);
            cartRepository.save(cart);
            return true;
        } else {
            return false;
        }
    }


}