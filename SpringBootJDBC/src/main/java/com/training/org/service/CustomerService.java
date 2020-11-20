package com.training.org.service;

import com.training.org.model.Customer;

public interface CustomerService {
	
	Customer get(String username);
	
	void save(Customer customer);
}

