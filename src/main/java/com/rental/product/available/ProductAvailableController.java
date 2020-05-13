package com.rental.product.available;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProductAvailableController {

    @Autowired
    private ProductAvailableService productAvailableService;

    @RequestMapping(method = RequestMethod.POST, value = "/addAvailability")
    public ResponseEntity<Boolean> addProductAvailability(@RequestBody String date,
            @RequestHeader(name = "token") String username) {

        Boolean result = productAvailableService.addProductAvailability(date, username);
        return new ResponseEntity<Boolean>(result, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/availability/{id}")
    public ResponseEntity<String> getProductAvailability(@PathVariable int id) throws JsonProcessingException {
        ProductAvailable pA = new ProductAvailable();
        pA = productAvailableService.getAvailability(id);
        ObjectMapper map = new ObjectMapper();
        String jsonString;
        jsonString =  map.writeValueAsString(pA.getEnddate());
        return new ResponseEntity<String>(jsonString, HttpStatus.OK);
    }

    @RequestMapping(value="/updateAvailability", method=RequestMethod.PUT)
    public ResponseEntity<Boolean> updateProductAvailability(@RequestBody ProductAvailable pA, @RequestHeader(name = "token") String username) {
        Boolean result = productAvailableService.updateProductAvailability(pA, username);
        return new ResponseEntity<Boolean>(result,HttpStatus.OK);
    }


}