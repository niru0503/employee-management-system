import { Component } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})

export class EmployeeListComponent {
  employees: Employee[] | undefined;
  searchName: string = '';
  searchDepartment: string = '';
  
  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
     this.getEmployees();
  }

  getEmployees(){
    this.employeeService.getEmployeesList().subscribe(data => {
      this.employees = data;
    })
  }

  search(){
    const name = this.searchName && this.searchName.trim() !== '' ? this.searchName.trim() : undefined;
    const department = this.searchDepartment && this.searchDepartment.trim() !== '' ? this.searchDepartment.trim() : undefined;
    this.employeeService.searchEmployees(name, department).subscribe({
      next: (data) => { this.employees = data; },
      error: (err) => console.error('Search error', err)
    });
  }

  clearSearch(){
    this.searchName = '';
    this.searchDepartment = '';
    this.getEmployees();
  }

  updateEmployee(id : any){
      this.router.navigate(['update-employee', id]);
  }

  deleteEmployee(id : any){
    if(!confirm('Are you sure you want to delete this employee? This action cannot be undone.')) return;
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        alert('Employee deleted successfully.');
        setTimeout(() => {
          this.getEmployees();
        }, 200);
      },
      error: (err) => {
        console.error('Delete failed', err);
        alert('Failed to delete employee. Please try again.');
      }
    });
  }

  employeeDetails(id: any){
      this.router.navigate(['employee-details', id]);
  }

}
