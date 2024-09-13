import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  constructor(private http: HttpClient) {}

  onLogin(obj: any): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/token/', obj);
  }

  getRoles(tableName: string) {
    return this.http.get(`${this.apiUrl}/${tableName}`,  { headers: {} });
  }
  

  getUserDetails(tableName: string): Observable<any> {
    const token = localStorage.getItem('access');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get(`${this.apiUrl}/${tableName}`, { headers });
  }

  RegisterUser(tableName:string,data:any){
 
    return this.http.post(`${this.apiUrl}/${tableName}`,data, );
  }

  addRecord(tableName:string,data:any){
    const token = localStorage.getItem('access');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/${tableName}`,data, { headers });
  }


  addRecordput(tableName: string, data: any) {
    const token = localStorage.getItem('access');
    if (!token) {
      console.error('No access token found');
      return;
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}/${tableName}`, data, { headers });
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


  updateLeaveRequestStatus(leaveRequestId: number, newStatusId: number): Observable<any> {
    const url = `${this.apiUrl}/LeaveRequestdetails/${leaveRequestId}/`;
    const token = localStorage.getItem('access');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.patch(url, { status: newStatusId },{ headers });
  }

  getUsersByRole(roleId: number): Observable<any> {

    const token = localStorage.getItem('access');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(`${this.apiUrl}userusers/by-role/${roleId}`,{headers});
  }

  updateAttendanceStatus(attendanceId: number, newStatusId: number): Observable<any> {
    const token = localStorage.getItem('access');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.patch<any>(`${this.apiUrl}/Attendancedetail/${attendanceId}/`, { status_id: newStatusId },{headers});
  }

  sendNotification(userId: number, message: string): Observable<any> {
    const url = `${this.apiUrl}/Notificationuser/${userId}/`;
    const token = localStorage.getItem('access');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(url, { message }, { headers });
  }

  getLeaveRequestDetailsByUser(userId: number): Observable<any> {
    const token = localStorage.getItem('access');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/LeaveRequestdetails/by-user/${userId}/`,{headers});
  }

  getUserNotifications(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Notificationuser/${userId}/`);
  }
}
