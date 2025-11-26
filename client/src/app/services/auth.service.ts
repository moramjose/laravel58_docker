import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://192.168.0.199:8058/api/auth';

  constructor(private http: HttpClient) { }

  login(credentials: any) {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response.access_token) {
          localStorage.setItem('token', response.access_token);
        }
      })
    );
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  register(user: any) {
    return this.http.post<any>(`${this.apiUrl}/register`, user).pipe(
      tap(response => {
        if (response.access_token) {
          localStorage.setItem('token', response.access_token);
        }
      })
    );
  }
}