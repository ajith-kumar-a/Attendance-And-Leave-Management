import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // Adjust the import path if needed

@Component({
  selector: 'app-all-user-attendance-details',
  templateUrl: './all-user-attendance-details.component.html',
  styleUrls: ['./all-user-attendance-details.component.css']
})
export class AllUserAttendanceDetailsComponent implements OnInit {
  roleIds: number[] = [1, 2, 3, 4]; // Example role IDs
  attendanceData: { [roleId: number]: any[] } = {}; // Object to hold attendance data for each role

  constructor(private userService: AuthService) { }

  ngOnInit(): void {
    this.loadAttendanceDataForRoles();
  }

  loadAttendanceDataForRoles(): void {
    this.roleIds.forEach(roleId => {
      this.userService.getLeaveRequestDetails('Attendanceattendance/by-role/',roleId).subscribe(
        (data) => {
          this.attendanceData[roleId] = data.data; // Assuming the API response contains a 'data' field
          console.log(this.attendanceData); // Optional: log the data to check
        },
        (error) => {
          console.error(`Error fetching attendance for role ID ${roleId}`, error);
        }
      );
    });
  }
}
