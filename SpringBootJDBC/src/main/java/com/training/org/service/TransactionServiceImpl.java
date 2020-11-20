package com.training.org.service;


import java.sql.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.training.org.model.Transaction;
import com.training.org.repository.TransactionRepository;

@Service
public class TransactionServiceImpl implements TransactionService {

	@Autowired
	private TransactionRepository repo; 
	
	@Transactional
	@Override
	public Float getSpentDetails(Date start,Date current,int account_id) {
		return repo.getSpentDetails(start,current,account_id);
	}
	
	@Transactional
	@Override
	public void save(Transaction transaction) {
		repo.save(transaction);
	}

} 