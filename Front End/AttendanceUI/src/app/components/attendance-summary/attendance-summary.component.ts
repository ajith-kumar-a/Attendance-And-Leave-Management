<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
// import { AttendanceService } from './attendance.service';

interface Attendance {
  id: number;
  date: string;
  leaveType: string;
  remark: string;
}
=======
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
>>>>>>> origin/main

@Component({
  selector: 'app-attendance-summary',
  templateUrl: './attendance-summary.component.html',
  styleUrls: ['./attendance-summary.component.css']
})
<<<<<<< HEAD
export class AttendanceSummaryComponent  {
  attendanceData: Attendance[] = [];
  filteredAttendance: Attendance[] = [];
=======
export class AttendanceSummaryComponent {
>>>>>>> origin/main
  startDate: string = '';
  endDate: string = '';
  attendanceData: any[] = [];
  private apiUrl = 'assets/attendance.json';  // Path to the JSON file

<<<<<<< HEAD
  // constructor(private attendanceService: AttendanceService) {}

  // ngOnInit(): void {
  //   this.attendanceService.getAttendance().subscribe((data) => {
  //     this.attendanceData = data;
  //   });
  // }

  applyFilter(): void {
    if (this.startDate && this.endDate) {
      const start = new Date(this.startDate).getTime();
      const end = new Date(this.endDate).getTime();

      this.filteredAttendance = this.attendanceData.filter(item => {
        const itemDate = new Date(item.date).getTime();
        return itemDate >= start && itemDate <= end;
      });
    }
=======
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
>>>>>>> origin/main
  }
}
