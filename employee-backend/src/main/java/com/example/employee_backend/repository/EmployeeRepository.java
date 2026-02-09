package com.example.employee_backend.repository;

import com.example.employee_backend.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    
    @Query("SELECT e FROM Employee e WHERE " +
           "(:name IS NULL OR LOWER(e.firstName) LIKE LOWER(CONCAT('%', :name, '%')) OR LOWER(e.lastName) LIKE LOWER(CONCAT('%', :name, '%'))) AND " +
           "(:department IS NULL OR e.department = :department)")
    List<Employee> searchEmployees(@Param("name") String name, @Param("department") String department);
}
