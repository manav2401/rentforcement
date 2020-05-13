package com.rental.user.order;

import java.util.ArrayList;

import com.rental.handler.CustomException;
import com.rental.user.User;
import com.rental.user.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

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

    public Boolean addNewOrder(int userId, Order order) {

        order.setUserid(userId);
        order.setOrderStatus("Placed");
        // System.out.println("ORDER OBJECT: " + order.toString());

        orderRepository.save(order);

        return true;
    }

    public ArrayList<Order> fetchOrders(int userId) throws CustomException {

        ArrayList<Order> output = new ArrayList<Order>();
        output = orderRepository.findAllByUserid(userId);
        return output;
        
    }




}