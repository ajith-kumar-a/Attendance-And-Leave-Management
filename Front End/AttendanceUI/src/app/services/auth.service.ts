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
    const token = localStorage.getItem('access');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/${tableName}`,data, { headers });
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

  // Profile pic 

  // Update profile picture for a specific user
  updateProfilePicture(rollno: string, imageData: string): Observable<any> {
    // Fetch the current data, update, and then write back (mocked for frontend)
    return new Observable(observer => {
      this.http.get<any>(this.apiUrl).subscribe(data => {
        const user = data.user_details.find((u: any) => u.rollno === rollno);
        if (user) {
          user.profilePicture = imageData;  // Update profile picture

          // Ideally, we would send a PUT request to update the JSON file in the backend
          this.http.put(this.apiUrl, data).subscribe(
            () => {
              observer.next(user);
              observer.complete();
            },
            error => observer.error(error)
          );
        } else {
          observer.error('User not found');
        }
      });
    });
  }



}
