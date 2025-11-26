import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) { }

  onLogin() {
    const creds = { email: this.email, password: this.password };
    this.auth.login(creds).subscribe({
    next: () => {
      this.router.navigate(['/authors']);
    },
      error: (err) => {
        this.error = 'Credenciales incorrectas o error de conexión';
        console.error(err);
      }
    });
  }
}