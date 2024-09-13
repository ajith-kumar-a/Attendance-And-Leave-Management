import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-list-student-attendance',
  templateUrl: './list-student-attendance.component.html',
  styleUrl: './list-student-attendance.component.css'
})
export class ListStudentAttendanceComponent {
  roleId: number = 1; // Fixed role ID to 1 for students
  attendanceData: any[] = []; // Store attendance data for the fixed role
  userMap: { [userId: number]: string } = {}; 
  statusMap: { [statusId: number]: string } = {}; // Map to store status ID to status name

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loadUserDetails();
    this.loadStatusDetails();
    this.loadAttendanceDataForRole();
  }

  loadUserDetails(): void {
    this.authService.getUserDetails('userall/').subscribe(
      (response) => {
        this.userMap = {}; 
        response.forEach((user: any) => {
          this.userMap[user.id] = user.username;
        });
      },
      (error) => {
        console.error('Error fetching user details', error);
      }
    );
  }

  loadStatusDetails(): void {
    this.authService.getUserDetails('Attendancestatus/').subscribe(
      (response) => {
        response.data.forEach((status: any) => {
          this.statusMap[status.id] = status.status; 
        });
      },
      (error) => {
        console.error('Error fetching status details', error);
      }
    );
  }

  loadAttendanceDataForRole(): void {
    this.authService.getLeaveRequestDetails('Attendanceattendance/by-role/', this.roleId).subscribe(
      (data) => {
        if (data && data.data) {
          this.attendanceData = data.data;
          console.log('Attendance Data for Role ID', this.roleId, ':', this.attendanceData);
        } else {
          console.error('Invalid response structure for role ID', this.roleId, ':', data);
        }
      },
      (error) => {
        console.error(`Error fetching attendance for role ID ${this.roleId}`, error);
      }
    );
  }

  getUsername(userId: number): string {
    return this.userMap[userId] || 'Unknown User';
  }

  getStatusName(statusId: number): string {
    return this.statusMap[statusId] || 'Unknown Status';
  }

  onStatusChange(event: Event, attendanceId: number): void {
    const selectElement = event.target as HTMLSelectElement;
    const newStatusId = +selectElement.value; 
    this.updateAttendanceStatus(attendanceId, newStatusId);
  }

  updateAttendanceStatus(attendanceId: number, newStatusId: number): void {
    this.authService.updateAttendanceStatus(attendanceId, newStatusId).subscribe(
      (response: any) => {
        console.log('Attendance status updated successfully:', response);
        this.loadAttendanceDataForRole(); 
      },
      (error) => {
        console.error('Error updating attendance status', error);
      }
    );
  }
}
