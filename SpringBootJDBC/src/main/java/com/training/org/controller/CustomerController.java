package com.training.org.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.training.org.model.Customer;
import com.training.org.service.CustomerService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CustomerController {

	@Autowired
	private CustomerService customerService;
	
	//Saving Record of Customer to Database
	
	@PostMapping("/customer")
	public Customer save(@RequestBody Customer customerObj) {
		customerService.save(customerObj);
		return customerObj;
	}
	
	//POST API for Authorizing customer by passing Username and password and returning Valid Object
	
	@PostMapping("/customer/authorize")
	public String validate(@RequestBody Customer customer) {
		Customer c = customerService.get(customer.getUsername()); 
	
		if(c==null) {
			return "invalid";
		}
		if(c.getPassword().equals(customer.getPassword()))
				return "valid";
		else
				return "invalid";
	}
	
}

