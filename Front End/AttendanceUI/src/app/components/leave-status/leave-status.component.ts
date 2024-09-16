import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationServiceService } from '../../services/notification-service.service';
import { interval, switchMap } from 'rxjs';
import { Location } from '@angular/common'; // Import Location service


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
  previousLeaveRequestDetails: any[] = []; // Track previous statuses

  constructor(
    private authService: AuthService,
    private notificationService: NotificationServiceService,
    private snackBar: MatSnackBar,
    private cd: ChangeDetectorRef,
    private location: Location 
  ) {}

  ngOnInit(): void {
    // Initialize notification subscription
    this.notificationSubscription();

    // Fetch user details to get userId
    this.authService.getUserDetails('userme/').subscribe(
      user => {
        this.userId = user.data?.id;
        if (this.userId) {
          this.fetchStatusDetails();
          this.fetchLeaveStatusDetails();
          this.fetchLeaveTypeDetails();

          // Set up polling after userId is available
          interval(1000).pipe(
            switchMap(() => this.authService.getLeaveRequestDetails('LeaveRequestdetails/by-user/', this.userId))
          ).subscribe(
            data => {
              const newLeaveRequestDetails = data.data || [];
              this.checkForStatusChanges(newLeaveRequestDetails);
              this.leaveRequestDetails = newLeaveRequestDetails;
              this.previousLeaveRequestDetails = [...newLeaveRequestDetails]; // Update previous details
            },
            error => {
              console.error('Error fetching leave request details', error);
            }
          );
        }
      },
      error => {
        console.error('Error fetching user details', error);
      }
    );
  }

  notificationSubscription(): void {
    this.notificationService.notification$.subscribe(
      message => {
        console.log('Received notification:', message);
        this.openSnackBar(message);
        this.cd.detectChanges(); 
      },
      error => {
        console.error('Notification subscription error:', error);
      }
    );
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 500, // Adjust duration if needed
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['custom-snackbar'] // Apply custom class
    });
  }

  fetchStatusDetails(): void {
    this.authService.getLeaveRequestDetails('LeaveRequestdetails/by-user/', this.userId).subscribe(
      data => {
        this.leaveRequestDetails = data.data || [];
        this.previousLeaveRequestDetails = [...this.leaveRequestDetails]; // Initialize previous statuses
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

  checkForStatusChanges(newDetails: any[]): void {
    newDetails.forEach(newRequest => {
      const previousRequest = this.previousLeaveRequestDetails.find(req => req.id === newRequest.id);
      if (previousRequest) {
        if (previousRequest.status !== newRequest.status) {
          // Status has changed
          const statusChangeMessage = `Leave request ${newRequest.id} status updated from ${this.getStatusName(previousRequest.status)} to ${this.getStatusName(newRequest.status)}`;
          this.notificationService.sendNotification(statusChangeMessage);
        }
      } else {
        // Handle the case where the request is new and not in previous details
        this.notificationService.sendNotification(`New leave request ${newRequest.id} status is ${this.getStatusName(newRequest.status)}`);
      }
    });
  }
  back(): void {
    this.location.back(); // Navigate back to the previous page
  }
}
