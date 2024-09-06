import { Component } from '@angular/core';

@Component({
  selector: 'app-teacher-leavestatus',
  templateUrl: './teacher-leavestatus.component.html',
  styleUrls: ['./teacher-leavestatus.component.css']
})
export class TeacherLeavestatusComponent {
  employeeId: string = '';
  statusMessage: string = '';

  // Define the type of mockData to include an index signature
  mockData: { [key: string]: string } = {
    '001': 'Leave Approved: Vacation from 2024-09-01 to 2024-09-07',
    '002': 'Leave Pending: Medical Leave from 2024-09-10 to 2024-09-15',
    '003': 'No leave requests found'
  };

  checkStatus() {
    // Use the index signature to access the mockData
    this.statusMessage = this.mockData[this.employeeId] || 'Invalid Employee ID';
  }
}
