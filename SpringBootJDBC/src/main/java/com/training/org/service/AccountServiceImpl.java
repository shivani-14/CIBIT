package com.training.org.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.training.org.model.Account;
import com.training.org.repository.AccountRepository;

@Service
public class AccountServiceImpl implements AccountService { 
	
	@Autowired
	private AccountRepository repo;
	
	@Transactional
	@Override
	public List<Account> get() {
		return (List<Account>)repo.getAll();
	}
	

	@Transactional
	@Override
	public Account get(int account_id) {
		return (Account)repo.getAccount(account_id);
	}
	
	@Transactional
	@Override
	public List<Account> getAccountsByUsername(String username){
		return (List<Account>)repo.getAccountsByUsername(username);
	}
	
	@Transactional
	@Override
	public void updateBalance(int bal,int account_id) {
		repo.updateBalance(bal, account_id);
	}

} 