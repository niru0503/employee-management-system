import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'ems_auth_token';
  private userKey = 'ems_auth_user';

  private baseURL = 'http://localhost:8080/auth';

  constructor(private httpClient: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    const payload = { username, password };
    return this.httpClient
      .post<ApiResponse<any>>(`${this.baseURL}/login`, payload)
      .pipe(
        map((response) => {
          if (response.success && response.data) {
            localStorage.setItem(this.tokenKey, response.data.token);
            localStorage.setItem(this.userKey, response.data.username);
          }
          return response.data;
        }),
        catchError((error) => {
          console.error('Login failed:', error);
          throw error;
        })
      );
  }

  logout(){
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean{
    return !!localStorage.getItem(this.tokenKey);
  }

  currentUser(): string | null{
    return localStorage.getItem(this.userKey);
  }
}
