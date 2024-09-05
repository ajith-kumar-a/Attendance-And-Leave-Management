import { Component } from '@angular/core';

@Component({
  selector: 'app-attendance-marking',
  templateUrl: './attendance-marking.component.html',
  styleUrl: './attendance-marking.component.css'
})
export class AttendanceMarkingComponent {
  selectedClass = '';
  selectedDate = '';
  classes = ['Class 1', 'Class 2', 'Class 3'];
  students = [
    { name: 'Student 1', attendance: '' },
    { name: 'Student 2', attendance: '' },
    { name: 'Student 3', attendance: '' }
  ];

  submitAttendance() {
    console.log('Attendance data:', this.selectedClass, this.selectedDate, this.students);
  }

}
