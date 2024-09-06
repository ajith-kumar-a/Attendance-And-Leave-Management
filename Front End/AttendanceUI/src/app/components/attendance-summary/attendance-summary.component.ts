import { Component, OnInit } from '@angular/core';

interface Attendance {
  id: number;
  date: string;
  leaveType: string;
  remark: string;
}

@Component({
  selector: 'app-attendance-summary',
  templateUrl: './attendance-summary.component.html',
  styleUrls: ['./attendance-summary.component.css']
})
export class AttendanceSummaryComponent {
  attendanceData: Attendance[] = [];
  filteredAttendance: Attendance[] = [];
  startDate: string = '';
  endDate: string = '';


  

  applyFilter(): void {
    if (this.startDate && this.endDate) {
      const start = new Date(this.startDate).getTime();
      const end = new Date(this.endDate).getTime();

      this.filteredAttendance = this.attendanceData.filter(item => {
        const itemDate = new Date(item.date).getTime();
        return itemDate >= start && itemDate <= end;
      });
    }
  }
}
