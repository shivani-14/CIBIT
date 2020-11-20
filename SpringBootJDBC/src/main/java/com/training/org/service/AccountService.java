package com.training.org.service;

import java.util.List;

import com.training.org.model.Account;

public interface AccountService {
	
	List<Account> get();
	
	Account get(int account_id);
	
	List<Account> getAccountsByUsername(String username);
	
	void updateBalance(int bal,int account_id); 
	
}

