package com.example.employee_backend.config;

import com.example.employee_backend.model.User;
import com.example.employee_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.Optional;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        // Check if admin user already exists
        Optional<User> existingAdmin = userRepository.findByUsername("admin");
        
        if (existingAdmin.isEmpty()) {
            // Create default admin user
            User adminUser = new User("admin", "admin123");
            userRepository.save(adminUser);
            System.out.println("✓ Admin user created successfully!");
            System.out.println("✓ Use POST http://localhost:8080/api/v1/admin/reset-database to reset employee data");
        } else {
            System.out.println("✓ Admin user already exists!");
            System.out.println("✓ Use POST http://localhost:8080/api/v1/admin/reset-database to reset employee data");
        }
    }
}
