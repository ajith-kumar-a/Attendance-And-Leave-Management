import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-attendance-summary',
  templateUrl: './attendance-summary.component.html',
  styleUrls: ['./attendance-summary.component.css']
})
export class AttendanceSummaryComponent {
  startDate: string = '';
  endDate: string = '';
  attendanceData: any[] = [];
  private apiUrl = 'assets/attendance.json';  // Path to the JSON file

  constructor(private http: HttpClient) { }

  fetchAttendance() {
    this.http.get<any[]>(this.apiUrl).subscribe(data => {
      // Optionally filter data based on the date range
      this.attendanceData = data.filter(record => {
        const recordDate = new Date(record.date);
        const start = new Date(this.startDate);
        const end = new Date(this.endDate);

        return (!this.startDate || recordDate >= start) &&
               (!this.endDate || recordDate <= end);
      });
    });
  }
}
