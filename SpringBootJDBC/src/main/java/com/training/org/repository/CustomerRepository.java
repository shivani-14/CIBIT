package com.training.org.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.training.org.model.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer,String> {
	
	
	@Query("select c from Customer c where c.username =:username")
	public Customer get(@Param("username") String username);
	
}