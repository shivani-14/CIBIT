package com.training.org.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.training.org.model.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee,Long> {
	@Query("select e from Employee e")
	public List<Employee> getAll();
	
	
	@Query("select e from Employee e where e.id = :id")
	public Employee getEmployee( int id);
	
	@Query("select e from Employee e where dob>= :start and dob<= :current")
	public List<Employee> getDetails(Date start,Date current);
}
