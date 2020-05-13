package com.rental.user.cart;

import java.util.ArrayList;

import com.rental.user.User;
import com.rental.user.UserService;
import com.rental.handler.CustomException;
import com.rental.product.Product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@CrossOrigin(origins = "*")
public class CartController {

    @Autowired
    private UserService userServ;

    @Autowired
    CartService cartService;

    @RequestMapping(method = RequestMethod.POST, value = "/addToCart")
    @ResponseBody
    public ResponseEntity<Boolean> addProductToCart(@RequestBody int productId,
            @RequestHeader(name = "token") String username) {
        // System.out.println("Username: " + username);
        Boolean userExist = cartService.checkIfUserExists(username);
        if (userExist == true) {
            int userId = cartService.getUserIdFromUsername(username);
            Boolean result = cartService.addProductToCart(userId, productId);
            return new ResponseEntity<Boolean>(result, HttpStatus.OK);
        } else {
            return new ResponseEntity<Boolean>(userExist, HttpStatus.OK);
        }
    }

    @RequestMapping(value = "/displayProductsInCart", method = RequestMethod.GET)
    public ResponseEntity<ArrayList<Product>> requestMethodName(@RequestHeader(name = "token") String username)
            throws CustomException {
        Boolean userExist = cartService.checkIfUserExists(username);
        ArrayList<Product> products = new ArrayList<Product>();
        if (userExist==true) {
            int userId = cartService.getUserIdFromUsername(username);            
            products = cartService.fetchCartProducts(userId);
        } 
        return new ResponseEntity<ArrayList<Product>>(products, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/removeFromCart")
    @ResponseBody
    public ResponseEntity<Boolean> removeFromCart(@RequestBody int productId, @RequestHeader(name = "token") String username) {
        System.out.println("Username: " + username);
        Boolean userExist = cartService.checkIfUserExists(username);
        if (userExist==true) {
            int userId = cartService.getUserIdFromUsername(username);
            Boolean result = cartService.removeProductFromCart(userId, productId);
            return new ResponseEntity<Boolean>(result, HttpStatus.OK);
        } else {
            return new ResponseEntity<Boolean>(userExist, HttpStatus.OK);
        }
    }

    @RequestMapping(value="/emptyCart", method=RequestMethod.DELETE)
    public ResponseEntity<Boolean> emptyCart(@RequestHeader(name = "token") String username) {
        Boolean result = cartService.checkIfUserExists(username);
        if (result) {
            result = cartService.emptyCart(cartService.getUserIdFromUsername(username));
        }
        return new ResponseEntity<Boolean>(result, HttpStatus.OK);
    }

}