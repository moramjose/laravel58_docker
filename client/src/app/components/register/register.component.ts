import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) { }

  onRegister() {
    const user = { 
      name: this.name, 
      email: this.email, 
      password: this.password 
    };

    this.auth.register(user).subscribe({
      next: () => {
        this.router.navigate(['/authors']);
      },
      error: (err) => {
        this.error = err.error.message || 'Error al registrarse'; 
      }
    });
  }
}