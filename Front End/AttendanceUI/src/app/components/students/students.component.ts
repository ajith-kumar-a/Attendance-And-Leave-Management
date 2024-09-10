import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ChartData, ChartOptions,TooltipItem } from 'chart.js';

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


  fetchStudentAttendance(userId: number, startDate?: string, endDate?: string): void {
    let apiurl:any =this.AuthService.getUserDetails(`Attendancedetail/by-user/${userId}/`);
    let start = new Date(startDate as string);
    let end = new Date(endDate as string);
    let filteredAttendance = [];
    // if (startDate && endDate ) {
    //   apiurl += `?start_date=${startDate}&end_date=${endDate}`;
    // }
    
    this.AuthService.getUserDetails(`Attendancedetail/by-user/${userId}/`).subscribe(
      (data:any) => {
        // console.log(data.data[0].date)
        console.log(data.data.length)
        console.log(start)
        console.log(end)

        for (let i = 0; i < data.data.length; i++) {
         
          let entryDate = new Date(data.data[i].date);
          console.log(entryDate)
          if (entryDate >= start && entryDate <= end) {
            filteredAttendance.push(data.data[i]);
          }
          console.log(data.data[0].date);

      }

        this.attendance = filteredAttendance;


        console.log(filteredAttendance)
        console.log(this.attendance)
      },
      (error:any) => {
        console.error('Error fetching attendance details', error);
      }
    );
  }

  fetchStudentDetails(){
    this.AuthService.getUserDetails('userme/').subscribe(
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
  applyFilter(): void {
    this.fetchStudentAttendance(this.user.id, this.leaveRequest['startDate'], this.leaveRequest['endDate']);
    console.log('hiiii      :',this.leaveRequest)
  }

}
