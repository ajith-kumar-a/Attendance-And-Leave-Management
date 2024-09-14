import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css'] // Fixed the typo from 'styleUrl' to 'styleUrls'
})
export class PracticeComponent implements OnInit {
  leaveData = {
    username: '',
    studentId: '',
    email: '',
    leaveType: '',
    reason: '',
    startDate: '',
    endDate: ''
  };
  userId: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchStudentDetails();
  }

  fetchStudentDetails(): void {
    this.authService.getUserDetails('userme/').subscribe(
      (data) => {
        this.leaveData = {
          username: data.data.username,
          studentId: data.data.id,
          email: data.data.email,
          leaveType: '',
          reason: '',
          startDate: '',
          endDate: ''
        };
        this.userId = data.data.id; // Ensure you have the correct field for user ID
        console.log('Full user object:', this.leaveData);
      },
      (error) => {
        console.error('Error fetching user details', error);
      }
    );
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const leaveData = {
        user_id: this.userId,
        status: 1, // Assuming 1 means approved
        reason: this.leaveData.reason,
        start_date: this.leaveData.startDate,
        end_date: this.leaveData.endDate,
        leave_type: this.leaveData.leaveType
      };

      this.authService.postLeaveRequest('LeaveRequestdetails/by-user/', this.userId, leaveData).subscribe(
        response => {
          console.log('Leave request submitted:', response);
          // Handle successful submission
        },
        error => {
          console.error('Error submitting leave request', error);
          // Handle submission error
        }
      );
    } else {
      console.error('Form is not valid');
    }
  }

  onCancel(): void {
    this.leaveData = {
      username: '',
      studentId: '',
      email: '',
      leaveType: '',
      reason: '',
      startDate: '',
      endDate: ''
    };
  }
}
