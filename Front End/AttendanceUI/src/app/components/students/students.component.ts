import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'] // Note the change here
})

export class StudentsComponent implements OnInit {
  user: any;
  attendance: any[] = [];
  statusMap:  any[] = []; 
  leaveRequest: any = {
    leaveType: '',
    reason: '',
    startDate: '',
    endDate: ''
  };

  constructor(private AuthService: AuthService) {}

  ngOnInit(): void {
    this.fetchStudentDetails()
    this.fetchStatusDetails(); // Fetch status details first

  }


  fetchStudentAttendance(userId: number): void {
    this.AuthService.getUserDetails(`Attendancedetail/by-user/${userId}/`).subscribe(
      (data) => {
        this.attendance = data.data;
      },
      (error) => {
        console.error('Error fetching attendance details', error);
      }
    );
  }


  fetchStudentDetails(){
    this.AuthService.getUserDetails('userme').subscribe(
      (data) => {
        this.user = data.data;
        console.log('Full user object:', this.user);
        this.fetchStudentAttendance(this.user.id);


      },
      (error) => {
        console.error('Error fetching user details', error);
      }
    );
  }
 

  fetchStatusDetails(): void {
    this.AuthService.getUserDetails('Attendancestatus/').subscribe(
      (data) => {
        this.statusMap = data.data
        console.log("ststus" + data)
      },
      (error) => {
        console.error('Error fetching status details', error);
      }
    );
  }
}
