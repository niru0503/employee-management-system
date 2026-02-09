package com.example.employee_backend.controller;

import com.example.employee_backend.dto.ApiResponse;
import com.example.employee_backend.model.Employee;
import com.example.employee_backend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.Statement;

@RestController
@RequestMapping("/api/v1/admin")
@CrossOrigin(origins = "http://localhost:4200")
public class AdminController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private DataSource dataSource;

    @PostMapping("/reset-database")
    public ResponseEntity<ApiResponse<String>> resetDatabase() {
        try {
            // Delete all employees
            employeeRepository.deleteAll();

            // Reset the auto-increment counter
            try (Connection connection = dataSource.getConnection();
                 Statement statement = connection.createStatement()) {
                statement.executeUpdate("ALTER TABLE employees AUTO_INCREMENT = 1");
            }

            // Add sample data
            Employee emp1 = new Employee("John", "Doe", "john.doe@gmail.com", "IT");
            Employee emp2 = new Employee("Jane", "Smith", "jane.smith@gmail.com", "HR");
            Employee emp3 = new Employee("Mike", "Johnson", "mike.johnson@gmail.com", "Finance");

            employeeRepository.save(emp1);
            employeeRepository.save(emp2);
            employeeRepository.save(emp3);

            return ResponseEntity.ok(new ApiResponse<>(true, "Database reset successfully with sample data", "Reset complete"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(false, "Error resetting database: " + e.getMessage(), null));
        }
    }
}
