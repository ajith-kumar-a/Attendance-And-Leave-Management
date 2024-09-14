import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-attendance-marking',
  templateUrl: './attendance-marking.component.html',
  styleUrls: ['./attendance-marking.component.css']
})
export class AttendanceMarkingComponent {
  selectedDate: string = '';  // Store the selected date for marking attendance
  students: any[] = [];       // Array to hold all student data
  studentRoleId: number = 1;  // Role ID for students (1 represents students)

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Fetch all students when the component loads
    this.fetchAllStudents();
  }

  // Fetch all students registered in the system
  fetchAllStudents(): void {
    const apiEndpoint = `Attendanceattendance/by-role/${this.studentRoleId}/`;
    this.authService.getUserDetails(apiEndpoint)
      .subscribe(
        (data: any) => {
          console.log("Fetched data:", data.data);
          
          // Use a Map to filter out duplicate student IDs
          const uniqueStudentsMap = new Map();
          data.data.forEach((student: any) => {
            if (!uniqueStudentsMap.has(student.user_id)) {
              uniqueStudentsMap.set(student.user_id, {
                id: student.id,              // This is the attendance `id` that will be passed
                user_id: student.user_id,    // This is the student's user ID
                username: student.username,  // Student's name
                roll_number: student.roll_number,  // Roll number
                attendance: '',              // Placeholder for attendance status
                attendance_date: ''          // Placeholder for attendance date
              });
            }
          });

          // Convert the map values to an array
          this.students = Array.from(uniqueStudentsMap.values());
          console.log('Fetched all unique students:', this.students);
        },
        (error: any) => {
          console.error('Error fetching student data:', error);
        }
      );
  }

  // Method to mark attendance for each student
  markAttendance(student: any, status: string): void {
    // Set the attendance status and the selected date
    student.attendance = status;
    student.status_id = status === 'Present' ? 2 : status === 'Absent' ? 3 : 1;
    student.attendance_date = this.selectedDate;  // Use the selected date

    console.log(`Student ID ${student.user_id} marked as ${status} on ${this.selectedDate}`);
  }

  // Submit the attendance for the selected date
  submitAttendance(): void {
    if (!this.selectedDate) {
      alert('Please select a date before submitting attendance.');
      return;
    }

    // Create an array to hold the observables from the API requests
    const requests = this.students
      .filter(student => student.status_id !== null) // Filter out students without a status
      .map(student => {
        const attendanceData = {
          status_id: student.status_id,
          user_id: student.user_id,  // Send the user ID in the request body
          remarks: student.remarks || 'No remarks',  // Add remarks or default to 'No remarks'
          date: this.selectedDate  // Use the selected date for all records
        };

        // Pass the attendance `id` (not the user_id) in the API endpoint
        const apiEndpoint = `Attendancedetail/${student.id}/`;
        return this.authService.addRecordput(apiEndpoint, attendanceData);
      });

    // Use forkJoin to wait for all requests to complete
    forkJoin(requests).subscribe(
      responses => {
        responses.forEach((response, index) => {
          console.log(`Attendance updated successfully for attendance ID ${this.students[index].id}`, response);
        });
        alert('Attendance updated successfully');
      },
      error => {
        console.error('Error updating attendance:', error);
        alert('There was an error updating attendance. Please check the console for details.');
      }
    );
  }
  
}
