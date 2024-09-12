import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-leave-status',
  templateUrl: './leave-status.component.html',
  styleUrls: ['./leave-status.component.css']
})
export class LeaveStatusComponent implements OnInit {
  leaveRequestDetails: any[] = [];
  userId: any;
  statusMap: any[] = [];
  leaveTypeMap: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserDetails('userme/').subscribe(
      user => {
        this.userId = user.data?.id;
        if (this.userId) {
          this.fetchStatusDetails();
        }
      },
      error => {
        console.error('Error fetching user details', error);
      }
    );
    this.fetchLeaveStatusDetails();
    this.fetchLeaveTypeDetails();
  }

  fetchStatusDetails(): void {
    this.authService.getLeaveRequestDetails('LeaveRequestdetails/by-user/', this.userId).subscribe(
      data => {
        this.leaveRequestDetails = data.data || [];
      },
      error => {
        console.error('Error fetching leave request details', error);
      }
    );
  }

  fetchLeaveStatusDetails(): void {
    this.authService.getUserDetails('LeaveRequeststatus/').subscribe(
      data => {
        this.statusMap = data.data || [];
      },
      error => {
        console.error('Error fetching status details', error);
      }
    );
  }

  fetchLeaveTypeDetails(): void {
    this.authService.getUserDetails('leaveTypedetails/').subscribe(
      data => {
        this.leaveTypeMap = data.data || [];
      },
      error => {
        console.error('Error fetching leave type details', error);
      }
    );
  }

  getLeaveTypeName(typeId: number): string {
    const type = this.leaveTypeMap.find(t => t.id === typeId);
    return type ? type.type : 'Unknown';
  }

  getStatusName(statusId: number): string {
    const status = this.statusMap.find(s => s.id === statusId);
    return status ? status.status : 'Unknown';
  }
}
