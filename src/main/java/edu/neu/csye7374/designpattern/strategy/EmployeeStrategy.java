package edu.neu.csye7374.designpattern.strategy;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import edu.neu.csye7374.model.Employee;
import edu.neu.csye7374.repository.EmployeeRepository;

public class EmployeeStrategy implements StrategyAPI{

	private EmployeeRepository employeeRepo;
	private int id;
	private Employee employee;
	
	public EmployeeStrategy(EmployeeRepository employeeRepo, Employee employee) {
		this.employeeRepo = employeeRepo;
		this.employee = employee;
	}

	public EmployeeStrategy(EmployeeRepository employeeRepo, int id) {
		this.employeeRepo = employeeRepo;
		this.id = id;
	}

	@Override
	public void add() {
		if(employeeRepo.usernameExists(employee.getUsername()))
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username already exists");
		employeeRepo.saveEmployee(employee);
	}

	@Override
	public void update() {
		employeeRepo.updateEmployee(employee);
	}

	@Override
	public void delete() {
		Employee emp = employeeRepo.getEmployeebyID(id);
		employeeRepo.deleteEmployee(emp);
	}

}
