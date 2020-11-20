package com.training.org.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import com.training.org.model.Customer;
import com.training.org.repository.CustomerRepository;

@Service
public class CustomerServiceImpl implements CustomerService {

	@Autowired
	private CustomerRepository repo; 
	
	@Transactional
	@Override
	public void save(Customer customer) {
		repo.save(customer);
	}

	@Transactional
	@Override
	public Customer get(String username) {
		return (Customer)repo.get(username);
	}
} 