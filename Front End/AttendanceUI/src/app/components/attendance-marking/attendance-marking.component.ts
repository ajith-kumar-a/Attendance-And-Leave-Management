import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Location } from '@angular/common'; // Import Location service


@Component({
  selector: 'app-attendance-marking',
  templateUrl: './attendance-marking.component.html',
  styleUrls: ['./attendance-marking.component.css']
})
export class AttendanceMarkingComponent implements OnInit {
  selectedDate: string = '';  // Store the selected date for marking attendance
  students: any[] = [];       // Array to hold all student data
  studentRoleId: number = 1;  // Role ID for students (1 represents students)
  userDetailsMap: Map<number, any> = new Map(); // Map to store user details by user_id

  constructor(private authService: AuthService,
    private location: Location 

  ) { }

  ngOnInit(): void {
    // Fetch all students and user details when the component loads
    this.fetchStudentallDetails();
    this.fetchAllStudentsAttendance();
  }

  // Fetch all user details based on role
  fetchStudentallDetails(): void {
    this.authService.getUserDetails('userusers/by-role/1/').subscribe(
      (data: any) => {
        console.log("Fetched user details:", data);

        // Map user details by user_id
        data.data.forEach((user: any) => {
          this.userDetailsMap.set(user.id, user);
        });
        console.log("this.userDetailsMap : ",this.userDetailsMap)
      },
      (error) => {
        console.error('Error fetching user details', error);
      }
    );
  }

  // Fetch all students registered in the system
  fetchAllStudentsAttendance(): void {
    const apiEndpoint = `Attendancedetail/by-role/${this.studentRoleId}/`;
    this.authService.getUserDetails(apiEndpoint).subscribe(
      (data: any) => {
        console.log("Fetched student data:", data.data);

        // Use a Map to filter out duplicate student IDs
        const uniqueStudentsMap = new Map();
        data.data.forEach((student: any) => {
          if (!uniqueStudentsMap.has(student.user_id)) {
            uniqueStudentsMap.set(student.user_id, {
              id: student.id,
              user_id: student.user_id,
              roll_number: student.roll_number,
              attendance: '',
              attendance_date: ''
            });
          }
        });

        // Convert the map values to an array
        this.students = Array.from(uniqueStudentsMap.values());

        // Associate the user details with students
        this.students.forEach(student => {
          const userDetails = this.userDetailsMap.get(student.user_id);
          if (userDetails) {
            student.username = userDetails.username;
          }
        });

        console.log('Fetched all unique students with details:', this.students);
      },
      (error: any) => {
        console.error('Error fetching student data:', error);
      }
    );
  }

  markAttendance(student: any, status: string): void {
    // Set the attendance status and the selected date
    student.attendance = status;
    student.status_id = status === 'Present' ? 2 : 3; // Assuming 2 for Present and 3 for Absent
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
      .filter(student => student.status_id !== undefined) // Filter out students without a status
      .map(student => {
        const attendanceData = {
          user_id: student.user_id,
          status_id: student.status_id,
          remarks: student.remarks || 'No remarks',
          logout_time: `${this.selectedDate}T10:07:22.441Z`
        };

        // API URL with the selected date
        const apiUrl = `Attendancedetail/update-by-date/${this.selectedDate}/`;
        return this.authService.addRecordput(apiUrl, attendanceData);
      });

    // Use forkJoin to wait for all requests to complete
    forkJoin(requests).subscribe(
      responses => {
        responses.forEach((response, index) => {
          console.log(`Attendance updated successfully for student ID ${this.students[index].user_id}`, response);
        });
        alert('Attendance updated successfully');
      },
      error => {
        console.error('Error updating attendance:', error);
        alert('There was an error updating attendance. Please check the console for details.');
      }
    );
  }
  back(): void {
    this.location.back(); // Navigate back to the previous page
  }
}
