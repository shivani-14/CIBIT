package com.training.org.service;

import java.sql.Date;

import com.training.org.model.Transaction;

public interface TransactionService {
	
	Float getSpentDetails(Date start,Date current,int account_id);
	
	void save(Transaction transaction);
	
}

