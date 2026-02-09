package com.example.employee_backend.controller;

import com.example.employee_backend.dto.ApiResponse;
import com.example.employee_backend.model.Employee;
import com.example.employee_backend.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/employees")
@CrossOrigin(origins = "http://localhost:4200")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Employee>>> getAllEmployees() {
        List<Employee> employees = employeeService.getAllEmployees();
        return ResponseEntity.ok(new ApiResponse<>(true, "Employees retrieved successfully", employees));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Employee>> createEmployee(@RequestBody Employee employee) {
        Employee createdEmployee = employeeService.createEmployee(employee);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>(true, "Employee created successfully", createdEmployee));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Employee>> getEmployeeById(@PathVariable Long id) {
        Optional<Employee> employee = employeeService.getEmployeeById(id);
        if (employee.isPresent()) {
            return ResponseEntity.ok(new ApiResponse<>(true, "Employee retrieved successfully", employee.get()));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(false, "Employee not found", null));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Employee>> updateEmployee(@PathVariable Long id, @RequestBody Employee employee) {
        Employee updatedEmployee = employeeService.updateEmployee(id, employee);
        if (updatedEmployee != null) {
            return ResponseEntity.ok(new ApiResponse<>(true, "Employee updated successfully", updatedEmployee));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(false, "Employee not found", null));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteEmployee(@PathVariable Long id) {
        boolean deleted = employeeService.deleteEmployee(id);
        if (deleted) {
            return ResponseEntity.ok(new ApiResponse<>(true, "Employee deleted successfully", null));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(false, "Employee not found", null));
        }
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<Employee>>> searchEmployees(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String department) {
        List<Employee> employees = employeeService.searchEmployees(name, department);
        return ResponseEntity.ok(new ApiResponse<>(true, "Search completed successfully", employees));
    }
}
