import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Employee Management System';

  constructor(public auth: AuthService, public router: Router) {}

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
}
