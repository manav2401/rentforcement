package com.rental.user.cart;

import com.rental.user.User;
import com.rental.user.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@CrossOrigin(origins = "*")
public class CartController {

    @Autowired
    private UserService userServ;

    @Autowired 
    CartService cartService;

    @RequestMapping(method = RequestMethod.POST, value = "/addToCart")
    @ResponseBody
    public ResponseEntity<Boolean> addProductToCart(@RequestBody int productId, @RequestHeader(name = "token") String username) {
        User currUser = userServ.getUserByUsername(username);
        int userId = currUser.getUserid();

        Boolean result = cartService.addProductToCart(userId, productId);

        return new ResponseEntity<Boolean>(result, HttpStatus.OK);

    }



}