package com.training.org.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="account")
public class Account {
	@Id
	@Column
	private int account_id;
	@Column
	private String account_type;
	@Column
	private int account_balance;
	@Column
	private int monthly_expense_limit;
	@Column
	private int thresold_amount;
	@Column
	private String username;
	
	public Account() {
		this.account_id = 0;
		this.account_type = "";
		this.account_balance = 0;
		this.monthly_expense_limit = 0;
		this.thresold_amount = 0;
		this.username = "";
	}
	
	public Account(int account_id, String account_type, int account_balance, int monthly_expense_limit,
			int threshold_amount, String username) {
		this.account_id = account_id;
		this.account_type = account_type;
		this.account_balance = account_balance;
		this.monthly_expense_limit = monthly_expense_limit;
		this.thresold_amount = threshold_amount;
		this.username = username;
	}

	public int getAccount_id() {
		return account_id;
	}

	public void setAccount_id(int account_id) {
		this.account_id = account_id;
	}

	public String getAccount_type() {
		return account_type;
	}

	public void setAccount_type(String account_type) {
		this.account_type = account_type;
	}

	public int getAccount_balance() {
		return account_balance;
	}

	public void setAccount_balance(int account_balance) {
		this.account_balance = account_balance;
	}

	public int getMonthly_expense_limit() {
		return monthly_expense_limit;
	}

	public void setMonthly_expense_limit(int monthly_expense_limit) {
		this.monthly_expense_limit = monthly_expense_limit;
	}

	public int getThreshold_amount() {
		return thresold_amount;
	}

	public void setThreshold_amount(int threshold_amount) {
		this.thresold_amount = threshold_amount;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	@Override
	public String toString() {
		return "Account [account_id=" + account_id + ", account_type=" + account_type + ", account_balance="
				+ account_balance + ", monthly_expense_limit=" + monthly_expense_limit + ", threshold_amount="
				+ thresold_amount + ", username=" + username + "]";
	}
	
	
}
