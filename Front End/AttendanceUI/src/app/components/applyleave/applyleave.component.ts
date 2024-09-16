import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Location } from '@angular/common'; // Import Location service
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-applyleave',
  templateUrl: './applyleave.component.html',
  styleUrls: ['./applyleave.component.css']
})
export class ApplyleaveComponent implements OnInit {
  leaveData: any = {
    studentId :''
  }; 
  userId: any;

  constructor(private authService: AuthService,
    private location: Location 
  ) {}

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
    if (this.leaveData.username && this.leaveData.studentId && this.leaveData.email &&
        this.leaveData.leaveType && this.leaveData.reason && this.leaveData.startDate &&
        this.leaveData.endDate) {
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
      fullName: '',
      studentId: '',
      email: '',
      leaveType: '',
      reason: '',
      startDate: '',
      endDate: ''
    };
  }
  getPlaceholder(control: NgModel): string {
    if (control.invalid && (control.dirty || control.touched)) {
      if (control.errors?.['required']) {
        return 'This field is required';
      }
      if (control.errors?.['minlength']) {
        return `Minimum length is ${control.errors['minlength'].requiredLength}`;
      }
      if (control.errors?.['email']) {
        return 'Invalid email address';
      }
    }
    return '';
  }
  back(): void {
    this.location.back(); // Navigate back to the previous page
  }
}
