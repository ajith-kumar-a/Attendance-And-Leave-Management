import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/userme';
  constructor(private http: HttpClient) {}

  onLogin(obj: any): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/token/', obj);
  }

  getUserDetails(): Observable<any> {
    const token = localStorage.getItem('access');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get(this.apiUrl, { headers });
  }
}
