import { Component } from '@angular/core';
import { Employee } from '../employee';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent {
  id! : number 
  employee!: Employee 
  constructor(private route: ActivatedRoute, private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.employee=new Employee();
    this.employeeService.getEmployeeById(this.id).subscribe({
      next: (data) => {
        this.employee=data;
      },
      error: (err) => {
        console.error('Error loading employee', err);
        alert('Failed to load employee details');
        this.router.navigate(['/employees']);
      }
    })
  }

  updateEmployee(id: number | undefined) {
    if(id) this.router.navigate(['update-employee', id]);
  }

  deleteEmployee(id: number | undefined) {
    if(!id) return;
    if(!confirm('Are you sure you want to delete this employee? This action cannot be undone.')) return;
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        alert('Employee deleted successfully.');
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        console.error('Delete failed', err);
        alert('Failed to delete employee');
      }
    });
  }

  employeeList() {
    this.router.navigate(['/employees']);
  }
}
