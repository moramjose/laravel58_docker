import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private apiUrl = 'http://192.168.0.199:8058/api/authors';

  constructor(private http: HttpClient, private auth: AuthService) { }

  private getHeaders() {
    const token = this.auth.getToken();
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  getAuthors() {
    return this.http.get<any[]>(this.apiUrl, this.getHeaders());
  }

  createAuthor(name: string) {
    return this.http.post<any>(this.apiUrl, { name }, this.getHeaders());
  }

  downloadExcel() {
    // URL directa al endpoint de exportación
    const exportUrl = 'http://192.168.0.199:8058/api/export';
    
    return this.http.get(exportUrl, {
      headers: this.getHeaders().headers,
      responseType: 'blob' // <--- ¡ESTO ES CRÍTICO! Le dice a Angular que viene un archivo
    });
  }
}