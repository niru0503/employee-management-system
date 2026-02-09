import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isNavOpen = false;
  isUserMenuOpen = false;

  constructor(public auth: AuthService, private router: Router) {}

  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  closeUserMenu() {
    this.isUserMenuOpen = false;
  }

  closeNav() {
    this.isNavOpen = false;
    this.closeUserMenu();
  }

  logout() {
    this.auth.logout();
    this.closeNav();
  }

  goToLogin() {
    this.router.navigate(['/login']);
    this.closeNav();
  }
}
