package com.rental.user.order;

import org.springframework.http.MediaType;

import java.util.ArrayList;

import com.rental.handler.CustomException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // @RequestMapping(value="/addOrder", method=RequestMethod.POST)
    // public ResponseEntity<Boolean> addOrder(@RequestBody Order order, @RequestHeader(name = "token") String username) {

    //     System.out.println("ORDER RECEIVED: " + order.toString());
    //     // Boolean userExist = orderService.checkIfUserExists(username);
    //     // if (userExist == true) {
    //     //     int userId = orderService.getUserIdFromUsername(username);
    //     //     Boolean result = orderService.addNewOrder(userId, order);
    //     //     return new ResponseEntity<Boolean>(result, HttpStatus.OK);
    //     // } else {
    //     //     return new ResponseEntity<Boolean>(userExist, HttpStatus.OK);
    //     // }
    //     return new ResponseEntity<Boolean>(true, HttpStatus.OK);

    // } 

    @RequestMapping(method = RequestMethod.POST, value="/addOrder")
	public ResponseEntity<Boolean> addOrder(@RequestBody Order order, @RequestHeader(name = "token") String username) {
        
        System.out.println("ORDER: " + order.toString());
        Boolean userExist = orderService.checkIfUserExists(username);
        if (userExist == true) {
            int userId = orderService.getUserIdFromUsername(username);
            Boolean result = orderService.addNewOrder(userId, order);
            return new ResponseEntity<Boolean>(result, HttpStatus.OK);
        } else {
            return new ResponseEntity<Boolean>(userExist, HttpStatus.OK);
        }
    }

    @RequestMapping(value = "/orders", method = RequestMethod.GET)
    public ResponseEntity<ArrayList<Order>> fetchOrders(@RequestHeader(name = "token") String username)
            throws CustomException {
        Boolean userExist = orderService.checkIfUserExists(username);
        ArrayList<Order> orders = new ArrayList<Order>();
        if (userExist==true) {
            int userId = orderService.getUserIdFromUsername(username);
            orders = orderService.fetchOrders(userId);
        } 
        return new ResponseEntity<ArrayList<Order>>(orders, HttpStatus.OK);
    }
    
}