import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  //Here we use HTTP Module to call REST API
    private baseURL = "https://employeemanagement-c6ceenc7e5atfdh4.centralus-01.azurewebsites.net/api/v1/employees"; // Base URL for employee API

  constructor(private httpClient: HttpClient) { }

  //this will provide us a list of employee
  getEmployeesList(): Observable<Employee[]>{
    return this.httpClient.get<any>(`${this.baseURL}`)
      .pipe(
        map(response => response.data || [])
      );
  }

  //this will send employee data to server and server saves employee data in my sql database
  createEmployee(employee: Employee): Observable<Object>{
    return this.httpClient.post<any>(`${this.baseURL}`, employee)
      .pipe(
        map(response => response.data)
      );
  }

  getEmployeeById(id: number): Observable<Employee>{
    return this.httpClient.get<any>(`${this.baseURL}/${id}`)
      .pipe(
        map(response => response.data)
      );
  }

  updateEmployee(id: number, employee: Employee): Observable<Object>{
    return this.httpClient.put<any>(`${this.baseURL}/${id}`, employee)
      .pipe(
        map(response => response.data)
      );
  }

  deleteEmployee(id: number): Observable<Object>{
    return this.httpClient.delete<any>(`${this.baseURL}/${id}`)
      .pipe(
        map(response => response)
      );
  }

  searchEmployees(name?: string, department?: string): Observable<Employee[]>{
    let query = '';
    if(name){ query += `name=${encodeURIComponent(name)}`; }
    if(department){ if(query) { query += '&'; } query += `department=${encodeURIComponent(department)}`; }
      const url = query ? `${this.baseURL}/search?${query}` : `${this.baseURL}`;
      return this.httpClient.get<any>(url)
        .pipe(
          map(response => response.data || [])
        );
  }
}
