package com.training.org.repository;

import java.sql.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.training.org.model.Transaction;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction,Integer> {
	
	@Query("select sum(t.amount) from Transaction t where t.date>= :start and t.date<= :current and t.transaction_type='debit' and t.from_account_id=:account_id")
	public Float getSpentDetails(@Param("start") Date start,@Param("current") Date current,@Param("account_id") int account_id);
	
}