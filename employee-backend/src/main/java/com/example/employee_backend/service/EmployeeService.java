package com.example.employee_backend.service;

import com.example.employee_backend.model.Employee;
import com.example.employee_backend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    public Employee updateEmployee(Long id, Employee employeeDetails) {
        Optional<Employee> employee = employeeRepository.findById(id);
        if (employee.isPresent()) {
            Employee emp = employee.get();
            if (employeeDetails.getFirstName() != null) {
                emp.setFirstName(employeeDetails.getFirstName());
            }
            if (employeeDetails.getLastName() != null) {
                emp.setLastName(employeeDetails.getLastName());
            }
            if (employeeDetails.getEmailId() != null) {
                emp.setEmailId(employeeDetails.getEmailId());
            }
            if (employeeDetails.getDepartment() != null) {
                emp.setDepartment(employeeDetails.getDepartment());
            }
            return employeeRepository.save(emp);
        }
        return null;
    }

    public boolean deleteEmployee(Long id) {
        if (employeeRepository.existsById(id)) {
            employeeRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<Employee> searchEmployees(String name, String department) {
        return employeeRepository.searchEmployees(name, department);
    }
}
