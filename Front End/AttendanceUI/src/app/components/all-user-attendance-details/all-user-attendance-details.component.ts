import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-all-user-attendance-details',
  templateUrl: './all-user-attendance-details.component.html',
  styleUrls: ['./all-user-attendance-details.component.css']
})
export class AllUserAttendanceDetailsComponent implements OnInit {
  roleIds: number[] = [1, 2, 3, 4]; // Example role IDs
  attendanceData: { [roleId: number]: any[] } = {}; 
  userMap: { [userId: number]: string } = {}; 
  statusMap: { [statusId: number]: string } = {}; // Map to store status ID to status name

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loadUserDetails();
    this.loadStatusDetails();
    this.loadAttendanceDataForRoles();
  }

  loadUserDetails(): void {
    this.authService.getUserDetails('userall/').subscribe(
      (response) => {
          // console.log('API Response:', response);
          this.userMap = {}; 
          response.forEach((user: any) => {
            // console.log("User:", user);
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
          console.log('Status API Response:', response);
          this.statusMap = {};
          response.data.forEach((status: any) => {
            console.log("Status:", status);
            this.statusMap[status.id] = status.status; 
          });
          console.log('StatusMap:', this.statusMap);
          console.error('Invalid response data structure for status');
        // }
      },
      (error) => {
        console.error('Error fetching status details', error);
      }
    );
  }

  loadAttendanceDataForRoles(): void {
    this.roleIds.forEach(roleId => {
      this.authService.getLeaveRequestDetails('Attendanceattendance/by-role/', roleId).subscribe(
        (data) => {
          if (data && data.data) {
            this.attendanceData[roleId] = data.data;
            console.log('Attendance Data for Role ID', roleId, ':', this.attendanceData[roleId]);
          } else {
            console.error('Invalid response structure for role ID', roleId, ':', data);
          }
        },
        (error) => {
          console.error(`Error fetching attendance for role ID ${roleId}`, error);
        }
      );
    });
  }

  getUsername(userId: number): string {
    return this.userMap[userId] || 'Unknown User';
  }

  getStatusName(statusId: number): string {
    return this.statusMap[statusId] || 'Unknown Status';
  }

  
  onStatusChange(event: Event, attendanceId: number): void {
    const selectElement = event.target as HTMLSelectElement;
    const newStatusId = +selectElement.value; // Convert value to number
    this.updateAttendanceStatus(attendanceId, newStatusId);
  }

  updateAttendanceStatus(attendanceId: number, newStatusId: number): void {
    this.authService.updateAttendanceStatus(attendanceId, newStatusId).subscribe(
      (response: any) => {
        console.log('Attendance status updated successfully:', response);
        this.loadAttendanceDataForRoles(); // Reload attendance data to reflect changes
      },
      (error) => {
        console.error('Error updating attendance status', error);
      }
    );
  }
}