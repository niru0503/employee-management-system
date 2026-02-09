import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  id!: number;
  employee: Employee = new Employee();
  emailExists: boolean = false;
  checkingEmail: boolean = false;
  allEmployees: Employee[] = [];
  originalEmail: string = '';
  departments: string[] = ['Engineering', 'HR', 'Sales', 'Marketing', 'Finance', 'Operations'];

  constructor(private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    // Load all employees for email validation
    this.loadAllEmployees();

    this.employeeService.getEmployeeById(this.id).subscribe({
      next: (data) => {
        this.employee = data;
        this.originalEmail = data.emailId || '';
      },
      error: (error) => {
        console.error('Failed to load employee', error);
        this.router.navigate(['/employees']);
      }
    });
  }

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

  checkEmailExists(email: string) {
    if (!email || !email.trim()) {
      this.emailExists = false;
      this.checkingEmail = false;
      return;
    }

    // If email hasn't changed, no need to check
    if (email.toLowerCase() === this.originalEmail.toLowerCase()) {
      this.emailExists = false;
      this.checkingEmail = false;
      return;
    }

    this.checkingEmail = true;
    
    setTimeout(() => {
      const emailExists = this.allEmployees.some(emp => 
        emp.emailId && 
        emp.emailId.toLowerCase() === email.toLowerCase() &&
        emp.id !== this.id // Exclude current employee
      );
      this.emailExists = emailExists;
      this.checkingEmail = false;
    }, 300);
  }

  onSubmit(form?: NgForm){
    if(form && form.invalid){
      Object.values(form.controls).forEach(c => c.markAsTouched());
      return;
    }

    if(this.emailExists) {
      return; // Don't submit if email already exists
    }

    this.employeeService.updateEmployee(this.id, this.employee).subscribe({
      next: (data) => {
        this.goToEmployeeList();
      },
      error: (error) => {
        console.error('Update failed', error);
      }
    });
  }

  goToEmployeeList(){
    this.router.navigate(['/employees']);
  }

  compareStrings(s1: string, s2: string): boolean {
    return s1 === s2;
  }
}