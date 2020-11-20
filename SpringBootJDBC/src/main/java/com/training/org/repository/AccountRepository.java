package com.training.org.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.training.org.model.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account,Integer> {
	@Query("select a from Account a")
	public List<Account> getAll();
	
	@Query("select a from Account a where a.account_id = :account_id")
	public Account getAccount(@Param("account_id") int account_id);
	
	@Query("select a from Account a where a.username =:username")
	public List<Account> getAccountsByUsername(@Param("username") String username);
	
	@Modifying
	@Query("update Account a set a.account_balance=:bal where a.account_id=:account_id")
	public void updateBalance(@Param("bal") int bal,@Param("account_id") int account_id);
	
}