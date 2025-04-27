package edu.neu.csye7374.controller;

import java.util.List;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import edu.neu.csye7374.model.Employee;
import edu.neu.csye7374.repository.EmployeeRepository;
import edu.neu.csye7374.designpattern.strategy.EmployeeStrategy;
import edu.neu.csye7374.designpattern.strategy.InventoryStrategy;

/**
 * @apiNote - REST Controller for Employees
 */
@RestController
@RequestMapping("/employee")
public class EmployeeController {
    @Autowired
    private EmployeeRepository employeeRepo;

    @GetMapping("/getAll")
    public List<Employee> getAll() {
        return employeeRepo.getEmployees();
    }

    @GetMapping("/getEmployee/{id}")
    public Employee getEmployee(@PathVariable int id) {
        return employeeRepo.getEmployeebyID(id);
    }

    @PutMapping("/update")
    public void update(@RequestBody Employee employee) {
        InventoryStrategy strategy = new InventoryStrategy(new EmployeeStrategy(employeeRepo, employee));
        strategy.executeUpdate();
    }

    @DeleteMapping("/delete/{id}")
    public void deletebyID(@PathVariable int id) {
        InventoryStrategy strategy = new InventoryStrategy(new EmployeeStrategy(employeeRepo, id));
        strategy.executeDelete();
    }

    @PostMapping("/save")
    public void save(@RequestBody Employee employee) {
        InventoryStrategy strategy = new InventoryStrategy(new EmployeeStrategy(employeeRepo, employee));
        strategy.executeAdd();
    }

    @PostMapping("/login")
    public Employee login(@RequestBody JSONObject jsoncredentials) {
        String username = (String) jsoncredentials.get("username");
        String password = (String) jsoncredentials.get("password");
        if(!employeeRepo.usernameExists(username))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username does not exist");
        return employeeRepo.getEmployeeforLogin(username, password);
    }

}