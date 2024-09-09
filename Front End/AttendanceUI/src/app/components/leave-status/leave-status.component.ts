import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-leave-status',
  templateUrl: './leave-status.component.html',
  styleUrls: ['./leave-status.component.css'] // Fixed typo from styleUrl to styleUrls
})
export class LeaveStatusComponent implements OnInit {
  leaveRequestDetails: any;
  userId: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserDetails('userme').subscribe(
      user => {
        console.log('User Details:', user.data);
        this.userId = user.data.id;
        if (this.userId) {
          this.fetchStatusDetails();
        }
      },
      error => {
        console.error('Error fetching user details', error);
      }
    );
  }
  
  fetchStatusDetails(): void {
    this.authService.getLeaveRequestDetails('LeaveRequestdetails/by-user/', this.userId).subscribe(
      (data) => {
        console.log('Leave Request Details:', data);
        this.leaveRequestDetails = data.data || [];
      },
      (error) => {
        console.error('Error fetching leave request details', error);
      }
    );
  }
  
}
