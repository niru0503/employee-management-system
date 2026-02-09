import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';
  isLoading = false;
  returnUrl: string | null = null;

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
  }

  submit(form?: any) {
    if (!form || form.invalid) return;
    this.error = '';
    this.isLoading = true;

    this.auth.login(this.username.trim(), this.password).subscribe(
      (response) => {
        const target = this.returnUrl ?? '/employees';
        this.router.navigateByUrl(target);
      },
      (error) => {
        console.error('Login error:', error);
        this.error = error.error?.message || 'Invalid credentials. Use admin / admin123';
        this.isLoading = false;
      }
    );
  }
}
