package com.training.org.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.training.org.model.Employee;
import com.training.org.repository.EmployeeRepository;

import java.sql.Date;
import java.time.LocalDate;
@Service
public class EmployeeService implements IEmployeeService {

	
	@Autowired
	private EmployeeRepository repository;
	@Override
	public List<Employee> getAll() {
		// TODO Auto-generated method stub
		return (List<Employee>)repository.getAll();
				
	}
	@Override
	public Employee getEmployee(int id) {
		// TODO Auto-generated method stub
		return (Employee)repository.getEmployee(id);
	}
	
	
	@Override
	public List<Employee> getDetails(Date start,Date current) {
		
		return (List<Employee>)repository.getDetails(start,current);
	}
	

}
