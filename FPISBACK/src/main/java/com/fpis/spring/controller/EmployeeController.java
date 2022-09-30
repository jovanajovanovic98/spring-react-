package com.fpis.spring.controller;

import com.fpis.spring.entity.Employee;
import com.fpis.spring.service.EmployeeService;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employee")
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.DELETE, RequestMethod.POST, RequestMethod.PUT})
@Getter
@Setter
public class EmployeeController {
  @Autowired
  private EmployeeService employeeService;

  @GetMapping
  public List<Employee> getAll() {
    return employeeService.getAll();
  }
}
