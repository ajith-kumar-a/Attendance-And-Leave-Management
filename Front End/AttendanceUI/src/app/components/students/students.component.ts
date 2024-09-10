import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ChartData, ChartOptions,TooltipItem } from 'chart.js';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  user: any;
  img: any;
  attendance: any[] = [];
  statusMap: any[] = [];
  leaveRequest: any = {
    leaveType: '',
    reason: '',
    startDate: '',
    endDate: ''
  };
  baseUrl: string = 'http://172.17.7.109:8000';

  @ViewChild('fileInput') fileInput!: ElementRef; // Non-null assertion operator
  
  constructor(private AuthService: AuthService) {}

  ngOnInit(): void {
    this.fetchStudentDetails();
    this.fetchStatusDetails(); // Fetch status details first
  }

  fetchStudentDetails() {
    this.AuthService.getUserDetails('userme/').subscribe(
      (data) => {
        this.user = data.data;
        console.log('Full user object:', this.user);
        this.fetchStudentAttendance(this.user.id);
        this.img = `${this.baseUrl}${this.user.profile_picture}`;
        console.log(this.img);
       
      },
      (error) => {
        console.error('Error fetching user details', error);
      }
    );
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


  // fetchStudentDetails(){
  //   this.AuthService.getUserDetails('userme').subscribe(
  //     (data) => {
  //       this.user = data.data;
  //       console.log('Full user object:', this.user);
  //       this.fetchStudentAttendance(this.user.id);


  //     },
  //     (error) => {
  //       console.error('Error fetching user details', error);
  //     }
  //   );
  // }
 

  fetchStatusDetails(): void {
    this.AuthService.getUserDetails('Attendancestatus/').subscribe(
      (data) => {
        this.statusMap = data.data;
        console.log('status', data);
       
      },
      (error) => {
        console.error('Error fetching status details', error);
      }
    );
  }


  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profile_picture', file);
      
      this.AuthService.updateProfilePicture(this.user.id, formData).subscribe(
        (response) => {
          // console.log('hiiiiiiiiiiiiiiiii')
          this.user.profile_picture = response.data.profile_picture; // Assuming the API returns the updated profile picture URL
          this.img = `${this.baseUrl}${this.user.profile_picture}`;
          console.log('Profile picture updated successfully', response);
       
        },
        (error) => {
          console.error('Error updating profile picture', error);
        }
      );
    }
  }
  applyFilter(): void {
    this.fetchStudentAttendance(this.user.id, this.leaveRequest['startDate'], this.leaveRequest['endDate']);
    console.log('hiiii      :',this.leaveRequest)
  }

}
