import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private auth: AuthService, private router: Router) {}

  hasToken() {
    return !!this.auth.getToken();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}