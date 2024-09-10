import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://172.17.7.109:8000/api';
  constructor(private http: HttpClient) {}

  onLogin(obj: any): Observable<any> {
    return this.http.post('http://172.17.7.109:8000/api/token/', obj);
  }

  getRoles(tableName: string) {
    return this.http.get(`${this.apiUrl}/${tableName}`,  { headers: {} });
  }
  

  getUserDetails(tableName: string): Observable<any> {
    const token = localStorage.getItem('access');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get(`${this.apiUrl}/${tableName}`, { headers });
  }

  addRecord(tableName:string,data:any){
    return this.http.post(`${this.apiUrl}/${tableName}`,data);
  }

  getLeaveRequestDetails(tableName:string,userId: number): Observable<any> {

    const token = localStorage.getItem('access');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.apiUrl}/${tableName}${userId}/`,  { headers });
  }


  postLeaveRequest(endPoint: string, userId: number, leaveData: any): Observable<any> {
    const token = localStorage.getItem('access');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(`${this.apiUrl}/${endPoint}${userId}/`, leaveData, { headers });
  }


  updateProfilePicture(userId: number, formData: FormData): Observable<any> {
    const token = localStorage.getItem('access');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}/userapi/user/update-profile-picture/${userId}/`, formData, { headers });
  }


}
