import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  employees: Employee[] = [];
  totalEmployees = 0;
  recentEmployees: Employee[] = [];
  departmentStats: any[] = [];
  loading = true;
  error = '';
  pieSlices: any[] = [];
  refreshIntervalMs = 5000;
  private refreshHandle: any;

  constructor(private employeeService: EmployeeService) {}

 

  loadDashboardData(): void {
    this.employeeService.getEmployeesList().subscribe({
      next: (data) => {
        this.employees = data;
        this.totalEmployees = this.employees.length;
        this.recentEmployees = this.employees.slice(0, 5);
        this.calculateDepartmentStats();
        this.buildPieSlices();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading employees:', error);
        this.error = 'Failed to load dashboard data';
        this.loading = false;
      }
    });
  }

  calculateDepartmentStats(): void {
    const departments: { [key: string]: number } = {};
    
    this.employees.forEach(emp => {
      const dept = emp.department || 'Unassigned';
      departments[dept] = (departments[dept] || 0) + 1;
    });

    this.departmentStats = Object.entries(departments).map(([dept, count]) => ({
      name: dept,
      count: count,
      percentage: ((count / this.totalEmployees) * 100).toFixed(1)
    }));
  }

  getStatColor(index: number): string {
    const colors = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6'];
    return colors[index % colors.length];
  }

  // Build SVG pie slices from departmentStats
  buildPieSlices(): void {
    if (!this.departmentStats || this.departmentStats.length === 0) {
      this.pieSlices = [];
      return;
    }

    const radius = 60;
    const cx = 70;
    const cy = 70;

    let startAngle = 0;
    this.pieSlices = this.departmentStats.map((d, i) => {
      const value = parseFloat(d.percentage) || 0;
      const angle = (value / 100) * 360;
      const endAngle = startAngle + angle;

      const path = this.describeArc(cx, cy, radius, startAngle, endAngle);
      const color = this.getStatColor(i);
      const slice = { path, color, label: d.name, percentage: d.percentage };
      startAngle = endAngle;
      return slice;
    }).filter(s => parseFloat(s.percentage) > 0);
  }

  // SVG arc helper
  polarToCartesian(cx: number, cy: number, radius: number, angleInDegrees: number) {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: cx + (radius * Math.cos(angleInRadians)),
      y: cy + (radius * Math.sin(angleInRadians))
    };
  }

  describeArc(cx: number, cy: number, radius: number, startAngle: number, endAngle: number) {
    const start = this.polarToCartesian(cx, cy, radius, endAngle);
    const end = this.polarToCartesian(cx, cy, radius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    const d = [
      `M ${cx} ${cy}`,
      `L ${start.x} ${start.y}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
      'Z'
    ].join(' ');

    return d;
  }

  ngOnInit(): void {
    this.loadDashboardData();
    // start periodic refresh
    this.refreshHandle = setInterval(() => {
      this.loadDashboardData();
    }, this.refreshIntervalMs);
  }

  ngOnDestroy(): void {
    if (this.refreshHandle) {
      clearInterval(this.refreshHandle);
    }
  }
}
