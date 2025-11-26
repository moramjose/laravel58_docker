import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://192.168.0.199:8058/api/books';

  constructor(private http: HttpClient, private auth: AuthService) { }

  private getHeaders() {
    const token = this.auth.getToken();
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  createBook(book: any) {
    return this.http.post<any>(this.apiUrl, book, this.getHeaders());
  }
}