package com.training.org.controller;

import java.sql.Date;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.training.org.model.Account;
import com.training.org.model.Transaction;
import com.training.org.service.AccountService;
import com.training.org.service.TransactionService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AccountController {

	@Autowired
	private AccountService accountService;
	
	@Autowired
	private TransactionService transactionService;
	

	//Saving Accounts to Database
	
//	@PostMapping("/account")
//	public Account save(@RequestBody Account accountObj) {
//		accountService.save(accountObj);
//		return accountObj;
//	}
	
	//POST API for Funds Transfer
	
	@PostMapping("/account/FundsTransfer")
	public Transaction makeTransaction(@RequestBody Transaction transaction) {
		
		Account account1 = accountService.get(transaction.getFrom_account_id());
		Account account2 = accountService.get(transaction.getTo_account_id());
		
		String transfer_type = transaction.getTransaction_type();
		
		int bal1  = account1.getAccount_balance();
		int bal2 = account2.getAccount_balance();
		
		if(transaction.getTransaction_type().equals("debit")) {
			bal1 = bal1 - transaction.getAmount();
			bal2 = bal2 + transaction.getAmount();
		}
		else {    
			bal1 = bal1 + transaction.getAmount();
			bal2 = bal2 - transaction.getAmount();
		}
		
		accountService.updateBalance(bal1,account1.getAccount_id());
		accountService.updateBalance(bal2,account2.getAccount_id());
		
		Transaction t1 = new Transaction(transaction.getFrom_account_id(),transaction.getTo_account_id(),
						transaction.getAmount(),transfer_type,bal1,transaction.getRemark(),transaction.getDate());
		
		transactionService.save(t1);
		
		if(transfer_type.equals("debit"))
			transfer_type="credit";
		else
			transfer_type="debit";
		
		Transaction t2 = new Transaction(transaction.getTo_account_id(),transaction.getFrom_account_id(),
						transaction.getAmount(),transfer_type,bal2,transaction.getRemark(),transaction.getDate());
		
		transactionService.save(t2);
		
		return t1;
		
	}
	
	//POST API for Fixed Deposit
	
		@PostMapping("/account/FixedDeposit")
		public Transaction doTransaction(@RequestBody Transaction transaction) {
			
			Account account = accountService.get(transaction.getFrom_account_id());
			
			String transfer_type = transaction.getTransaction_type();
			
			int bal  = account.getAccount_balance();
			bal = bal - transaction.getAmount();
			
			accountService.updateBalance(bal,account.getAccount_id());
			System.out.println(bal);
			Transaction t = new Transaction(transaction.getFrom_account_id(),transaction.getTo_account_id(),
						transaction.getAmount(),transfer_type,bal,transaction.getRemark(),transaction.getDate());
			System.out.println("Line Number 105 : Before saving transaction");
			transactionService.save(t);
			
			return t;
			
		}
	
	//GET API for obtaining Account Details for specific customer by Username
	
	@GetMapping("customer/getAccountDetails/{username}")
	public List<Account> getAccountDetails(@PathVariable String username){

		List<Account> list = accountService.getAccountsByUsername(username);
		return list;
	}
	
	//GET API for obtaining Spent Amount in Current Month
	
	@GetMapping("/account/spent_amount/{account_id}")
	public Float getSpentAmount(@PathVariable int account_id) {
		
		LocalDate curr = LocalDate.now();
		LocalDate st  =curr.withDayOfMonth(1);
		Date start = Date.valueOf(st);
		Date current = Date.valueOf(curr);
		System.out.println(start+","+current);
		
		System.out.println("Line Number 132 : Before obtaining spent details transaction");
		
		Float amount = transactionService.getSpentDetails(start,current,account_id);
		return amount==null?0:amount;
	
		
	}
	@PostMapping("/test")
	public Transaction test(@RequestBody Transaction transaction) {
		return transaction;
	}
}

