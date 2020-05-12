package com.rental.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.fasterxml.jackson.core.JsonProcessingException;
// import com.fasterxml.jackson.databind.ObjectMapper;

@ControllerAdvice
public class ExeHandler {
	
	@ExceptionHandler(CustomException.class)
	public ResponseEntity<?> handleException(CustomException c) {

		try {
			return new ResponseEntity<String>(c.jsonString(c.getMessage()), HttpStatus.IM_USED);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		return null;
		
	}

}
