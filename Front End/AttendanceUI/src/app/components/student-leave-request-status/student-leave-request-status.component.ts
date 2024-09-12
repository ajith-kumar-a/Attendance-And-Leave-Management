import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NotificationServiceService } from '../../services/notification-service.service';

@Component({
  selector: 'app-student-leave-request-status',
  templateUrl: './student-leave-request-status.component.html',
  styleUrls: ['./student-leave-request-status.component.css']
})
export class StudentLeaveRequestStatusComponent implements OnInit {
  leaveRequests: any[] = [];
  roleId: number = 1;
  leaveTypeMap: any[] = [];
  statusMap: any[] = [];
  userMap: { [key: number]: string } = {}; // Map for user ID to username

  constructor(
    private authService: AuthService,
    private notificationService: NotificationServiceService
  ) {}

  ngOnInit(): void {
    this.getLeaveRequestsByRole(this.roleId);
    this.getLeaveTypeDetails();
    this.getStatusDetails();
    this.getUserDetails(); // Fetch user details on initialization
  }

  getLeaveRequestsByRole(roleId: number): void {
    const apiUrl = `LeaveRequestleave-requests/by-role/${roleId}/`;
    this.authService.getUserDetails(apiUrl).subscribe(
      (response: any) => {
        this.leaveRequests = response.data;
      },
      (error) => {
        console.error('Error fetching leave requests', error);
      }
    );
  }

  getLeaveTypeDetails(): void {
    this.authService.getUserDetails('leaveTypedetails/').subscribe(
      (data) => {
        this.leaveTypeMap = data.data;
      },
      (error) => {
        console.error('Error fetching leave type details', error);
      }
    );
  }

  getStatusDetails(): void {
    this.authService.getUserDetails('LeaveRequeststatus/').subscribe(
      (data) => {
        this.statusMap = data.data;
      },
      (error) => {
        console.error('Error fetching status details', error);
      }
    );
  }

  getUserDetails(): void {
    this.authService.getUserDetails('userusers/by-role/1/').subscribe(
      (response: any) => {
        this.userMap = response.data.reduce((map: { [key: number]: string }, user: any) => {
          map[user.id] = user.username;
          return map;
        }, {});
      },
      (error) => {
        console.error('Error fetching user details', error);
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

  getUsername(userId: number): string {
    return this.userMap[userId] || 'Unknown User';
  }

  updateLeaveRequestStatus(leaveRequestId: number, newStatusId: number): void {
    this.authService.updateLeaveRequestStatus(leaveRequestId, newStatusId).subscribe(
      (response: any) => {
        console.log('Status updated successfully', response);
        const leaveRequest = this.leaveRequests.find(req => req.id === leaveRequestId);
        if (leaveRequest) {
          leaveRequest.status = newStatusId;
          console.log(`Triggering notification for leave request ${leaveRequestId}`); // Debug log
          this.notificationService.sendNotification(`Leave request ${leaveRequestId} status updated to ${newStatusId}`);
        }
      },
      (error) => {
        console.error('Error updating leave request status', error);
      }
    );
  }
  
}
