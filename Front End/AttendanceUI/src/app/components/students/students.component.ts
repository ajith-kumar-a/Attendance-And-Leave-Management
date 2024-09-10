import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';

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
}
