package com.fpis.spring.service.impl;

import com.fpis.spring.entity.Employee;
import com.fpis.spring.repository.EmployeeRepository;
import com.fpis.spring.service.EmployeeService;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Getter
@Setter
public class EmployeeServiceImpl implements EmployeeService {
  @Autowired
  private EmployeeRepository employeeRepository;

  @Override
  public List<Employee> getAll() {
    return employeeRepository.findAll();
  }
}
