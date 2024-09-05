import { Component } from '@angular/core';

@Component({
  selector: 'app-attendance-marking',
  templateUrl: './attendance-marking.component.html',
  styleUrls: ['./attendance-marking.component.css']
})
export class AttendanceMarkingComponent {
  selectedClass = '';
  selectedDate = '';
  classes = ['Class 1', 'Class 2', 'Class 3'];
  courses = ['python', 'sql', 'Teaster'];
  
  students = [
    { id: 1, rollNumber: '101', name: 'ajith', course: '', attendance: ''},
    { id: 2, rollNumber: '102', name: 'prasanth', course: '', attendance: ''},
    { id: 3, rollNumber: '103', name: 'gokul', course: '', attendance: ''},
    { id: 4, rollNumber: '104', name: 'vijay', course: '', attendance: ''},
    { id: 5, rollNumber: '105', name: 'kamalesh', course: '', attendance: ''},
    { id: 6, rollNumber: '106', name: 'karupu', course: '', attendance: ''},
    { id: 7, rollNumber: '107', name: 'suresh', course: '', attendance: ''},
    { id: 8, rollNumber: '108', name: 'hamsa', course: '', attendance: ''},
    { id: 9, rollNumber: '109', name: 'sandeep', course: '', attendance: ''},
    { id: 10, rollNumber: '110', name: 'sanjay', course: '', attendance: ''}
  ];

  submitAttendance() {
    console.log('Attendance data:', this.selectedClass, this.selectedDate, this.students);
  }
}
