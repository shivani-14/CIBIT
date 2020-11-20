package com.training.org.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.training.org.model.Employee;
import com.training.org.service.IEmployeeService;

import java.sql.Date;
import java.time.LocalDate;
@RestController
public class MyController {
	
	@Autowired
	private IEmployeeService employeeService;
	
	@GetMapping("/getEmployees")
	public List<Employee> getEmployees(){
		return (List<Employee>)employeeService.getAll();
		
	}
	
	
	@GetMapping("/getCurrentMonthEntries")
	public List<Employee> getDetails(){
		LocalDate current = LocalDate.now();
		LocalDate start  =current.withDayOfMonth(1);
		Date start1 = Date.valueOf(start);
		Date current1 = Date.valueOf(current);
		System.out.println(start+","+current1);
		return (List<Employee>)employeeService.getDetails(start1,current1);
	}
	@GetMapping("/getEmployee/{id}")
	public Employee getEmployee(@PathVariable int id) {
		return (Employee)employeeService.getEmployee(id);
		
	}
}
