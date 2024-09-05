import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  onLogin(obj: any): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/token/', obj);
  }
}
