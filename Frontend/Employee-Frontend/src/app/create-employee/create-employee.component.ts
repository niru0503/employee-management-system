import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})

export class CreateEmployeeComponent implements OnInit{

  employee: Employee = new Employee()
  emailExists: boolean = false;
  departments: string[] = ['Engineering', 'HR', 'Sales', 'Marketing', 'Finance', 'Operations'];
  checkingEmail: boolean = false;
  allEmployees: Employee[] = [];

  constructor(private employeeService: EmployeeService, 
  private router: Router){ }

  ngOnInit(): void {
    // Load all employees to check for duplicate emails
    this.loadAllEmployees();
  }

  // Load all employees from the backend
  loadAllEmployees() {
    this.employeeService.getEmployeesList().subscribe({
      next: (data) => {
        this.allEmployees = data;
      },
      error: (error) => {
        console.error('Error loading employees:', error);
      }
    });
  }

  // Check if email already exists
  checkEmailExists(email: string) {
    if (!email || !email.trim()) {
      this.emailExists = false;
      this.checkingEmail = false;
      return;
    }

    this.checkingEmail = true;
    
    // Simulate a small delay for better UX
    setTimeout(() => {
      const emailExists = this.allEmployees.some(emp => 
        emp.emailId && emp.emailId.toLowerCase() === email.toLowerCase()
      );
      this.emailExists = emailExists;
      this.checkingEmail = false;
    }, 300);
  }

  // It send the employee data to employee service method(which is createEmployee)
  saveEmployee(){
    if (this.emailExists) {
      return; // Don't attempt to save if email exists
    }

    this.employeeService.createEmployee(this.employee).subscribe({
      next: (data) => {
        console.log(data);
        // Reload employees list
        this.loadAllEmployees();
        // Navigate to employee list
        this.goToEmployeeList();
      },
      error: (error) => {
        console.error('Create failed', error);
      }
    });
  }

  // It will transfer to the /employees path
  goToEmployeeList(){
    this.router.navigate(['/employees']);
  }

  onSubmit(form?: NgForm){
    if(form && form.invalid){
      // mark controls as touched to show validation
      Object.values(form.controls).forEach(c => c.markAsTouched());
      return;
    }
    
    if(this.emailExists) {
      return; // Don't submit if email already exists
    }

    this.saveEmployee();
  }

  // Compare function for dropdown value matching
  compareStrings(s1: string, s2: string): boolean {
    return s1 === s2;
  }
    
}
