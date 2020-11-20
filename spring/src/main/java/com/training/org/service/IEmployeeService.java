package com.training.org.service;

import java.sql.Date;
import java.util.List;

import com.training.org.model.Employee;

public interface IEmployeeService {
	public List<Employee> getAll();
	public Employee getEmployee(int id);

	public List<Employee> getDetails(Date start,Date current);
}
