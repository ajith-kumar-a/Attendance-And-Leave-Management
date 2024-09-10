import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-applyleave',
  templateUrl: './applyleave.component.html',
  styleUrls: ['./applyleave.component.css']
})
export class ApplyleaveComponent implements OnInit {
  leaveForm: FormGroup;
  userId: number = 11; // You should get this dynamically from your authentication service or similar

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.leaveForm = this.fb.group({
      fullName: ['', Validators.required],
      studentId: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      leaveType: ['', Validators.required],
      reason: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Optionally, fetch the leave request data here if needed
    // this.fetchLeaveRequestDetails();
  }

  onSubmit(): void {
    if (this.leaveForm.valid) {
      const leaveData = {
        user_id: this.userId,
        status: 1, // Assuming 0 means pending
        reason: this.leaveForm.value.reason,
        start_date: this.leaveForm.value.startDate,
        end_date: this.leaveForm.value.endDate,
        leave_type: this.leaveForm.value.leaveType
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
    }
  }

  onCancel(): void {
    this.leaveForm.reset();
  }

  // Optionally, add a method to fetch leave request details if needed
  // fetchLeaveRequestDetails(): void {
  //   this.authService.getLeaveRequestDetails('LeaveRequestdetails/by-user/', this.userId).subscribe(
  //     data => {
  //       console.log('Leave request details:', data);
  //       this.leaveForm.patchValue({
  //         fullName: data.fullName,
  //         studentId: data.studentId,
  //         email: data.email,
  //         leaveType: data.leaveType,
  //         reason: data.reason,
  //         startDate: data.start_date,
  //         endDate: data.end_date
  //       });
  //     },
  //     error => {
  //       console.error('Error fetching leave request details', error);
  //     }
  //   );
  // }
}
