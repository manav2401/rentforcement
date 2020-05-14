package com.rental.user;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.rental.handler.CustomException;

@Controller
@CrossOrigin(origins = "*")
public class UserController {
	
	@Autowired
	private UserService userServ;
	
	@RequestMapping(method = RequestMethod.POST, value = "/addUser")
	@ResponseBody
	public ResponseEntity<String> signUp(@RequestBody User user) throws CustomException, JsonProcessingException{
		
		ObjectMapper map = new ObjectMapper();
		String jsonString;
		System.out.println("Backend2");
		
		
		if(userServ.addUser(user)) {
			jsonString = map.writeValueAsString("User added");
			return new ResponseEntity<String>(jsonString, HttpStatus.OK);	
		}
		else {
			jsonString = map.writeValueAsString("Could not Add User");
			return new ResponseEntity<String>(jsonString, HttpStatus.INTERNAL_SERVER_ERROR);
		}	
		
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/users")
	@ResponseBody
	public ResponseEntity<ArrayList<User>> getUserlist(){
		System.out.println("Backend");
		ArrayList<User> list = new ArrayList<User>();
		list = userServ.getUserList();
		return new ResponseEntity<ArrayList<User>>(list, HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.POST, value="/signin")
	public ResponseEntity<Boolean> signIn(@RequestBody UserLogin user) {
		Boolean result;
		if (userServ.checkIfUserExists(user.getCredential())) {
			result = userServ.checkPasswordByUsername(user.getCredential(), user.getPassword());
			// System.out.println("HERE1");
		} else if (userServ.checkIdUserExistsByEmail(user.getCredential())) {
			result = userServ.checkPasswordByEmail(user.getCredential(), user.getPassword());
			// System.out.println("HERE2");
		} else {
			result = false;
		}
		return new ResponseEntity<Boolean>(result, HttpStatus.OK);
	}

}