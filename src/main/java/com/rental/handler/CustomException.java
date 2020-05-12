package com.rental.handler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class CustomException extends Exception{

	private static final long serialVersionUID = 1L;
	
	private String message;
	
	public CustomException() {
		
	}

	public CustomException(String message) {
		super();
		this.message = message;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
	public String jsonString(String msg) throws JsonProcessingException {
		ObjectMapper map = new ObjectMapper();
		return map.writeValueAsString(msg);
	}
	
	
	

}
