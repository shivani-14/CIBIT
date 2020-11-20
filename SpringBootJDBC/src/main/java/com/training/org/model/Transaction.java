package com.training.org.model;


import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="transaction")
public class Transaction {
	
	@Id
	@Column
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int transaction_id;
	
	@Column
	private int from_account_id;
	
	@Column
	private int to_account_id;
	
	@Column 
	private int amount;
	
	@Column
	private String transaction_type;
	
	@Column
	private int available_balance;
	
	@Column
	private String remark;
	
	@Column
	private Date date;

	public Transaction() {
		
		this.from_account_id = 0;
		this.to_account_id = 0;
		this.amount = 0;
		this.transaction_type = "";
		this.available_balance = 0;
		this.remark = "";
		this.date = new Date();
	}
	
	public Transaction(int from_account_id, int to_account_id, int amount, String transaction_type,
			int available_balance, String remark, Date date) {
		
		this.from_account_id = from_account_id;
		this.to_account_id = to_account_id;
		this.amount = amount;
		this.transaction_type = transaction_type;
		this.available_balance = available_balance;
		this.remark = remark;
		this.date = date;
	}

	public int getTransaction_id() {
		return transaction_id;
	}

	public void setTransaction_id(int transaction_id) {
		this.transaction_id = transaction_id;
	}

	public int getFrom_account_id() {
		return from_account_id;
	}

	public void setFrom_account_id(int from_account_id) {
		this.from_account_id = from_account_id;
	}

	public int getTo_account_id() {
		return to_account_id;
	}

	public void setTo_account_id(int to_account_id) {
		this.to_account_id = to_account_id;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public String getTransaction_type() {
		return transaction_type;
	}

	public void setTransaction_type(String transaction_type) {
		this.transaction_type = transaction_type;
	}

	public int getAvailable_balance() {
		return available_balance;
	}

	public void setAvailable_balance(int available_balance) {
		this.available_balance = available_balance;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	@Override
	public String toString() {
		return "Transaction [transaction_id=" + transaction_id + ", from_account_id=" + from_account_id
				+ ", to_account_id=" + to_account_id + ", amount=" + amount + ", transaction_type=" + transaction_type
				+ ", available_balance=" + available_balance + ", remark=" + remark + ", date=" + date + "]";
	}
	
}
