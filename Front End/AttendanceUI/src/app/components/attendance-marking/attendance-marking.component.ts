import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-attendance-marking',
  templateUrl: './attendance-marking.component.html',
  styleUrls: ['./attendance-marking.component.css']
})
export class AttendanceMarkingComponent {
  selectedDate: string = '';  // To store the selected date
  students: any[] = [];       // Array to hold the student data
  studentRoleId: number = 1;  // Role ID for students (1 represents students)
  user_id: number[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Optionally, fetch initial data if needed
  }

  // Apply the filter to fetch student data based on the selected date and role ID
  applyFilter(): void {
    if (this.selectedDate) {
      const apiEndpoint = `Attendanceattendance/by-role/${this.studentRoleId}/`;
      this.authService.getUserDetails(apiEndpoint)
        .subscribe(
          (data: any) => {
            const selectedDateObj = new Date(this.selectedDate as string);
            this.user_id = [];
            this.students = [];  // Clear previous student data

            // Iterate over each student record and check if the date matches
            for (let i = 0; i < data.data.length; i++) {
              const entryDateObj = new Date(data.data[i].date);

              if (entryDateObj.getTime() === selectedDateObj.getTime()) {
                const userId = data.data[i].user_id;
                
                // Avoid duplicates and add user_id
                if (!this.user_id.includes(userId)) {
                  this.user_id.push(userId);
                }
              }
            }

            // Fetch user details after filtering
            this.fetchStudentDetails();
          },
          (error: any) => {
            console.error('Error fetching student data:', error);
          }
        );
    } else {
      alert('Please select a date');
    }
  }

  // Fetch student details based on the filtered user_ids
  fetchStudentDetails(): void {
    for (let i = 0; i < this.user_id.length; i++) {
      this.authService.getUserDetails(`useruser/${this.user_id[i]}/`).subscribe(
        (data: any) => {
          console.log('Fetched user details:', data);

          // Push the user data (including name, roll number) into the students array
          this.students.push({
            id: data.id,
            username: data.username,  // Assuming 'username' contains the student's name
            roll_number: data.roll_number,  // Assuming 'roll_number' contains the roll number
            attendance: ''  // Placeholder for attendance status
          });
        },
        (error) => {
          console.error('Error fetching user details', error);
        }
      );
    }
  }

  // Method to mark attendance for each student
  markAttendance(student: any, status: string): void {
    // Set the attendance status locally
    student.attendance = status;
  
    // Map the status to status_id
    student.status_id = status === 'Present' ? 1 : 
                        status === 'Absent' ? 2 : 
                        null;  // If status is not recognized
    console.log("this is studnets status",student.status_id)
    if (student.status_id !== null) {
      console.log(`Student ID ${student.id} marked as ${status} (status_id: ${student.status_id})`);
    }
  }
  

  // Submit the attendance to the backend
  submitAttendance(): void {
    // Create an array to hold the observables from the API requests
    const requests = this.students
      .filter(student => student.status_id !== null) // Filter out students without a status_id
      .map(student => {
        const attendanceData = { 
          status_id: student.status_id,
          user_id: student.id,  // Add user_id to the request
          remarks: student.remarks || 'No remarks'  // Add remarks to the request, or default to 'No remarks'
        };
        const apiEndpoint = `Attendancedetail/${student.id}/`;
        console.log('this is attendance data', attendanceData);
        return this.authService.addRecordput(apiEndpoint, attendanceData);
      });
  
    // Use forkJoin to wait for all requests to complete
    forkJoin(requests).subscribe(
      responses => {
        // Log successful responses
        responses.forEach((response, index) => {
          console.log(`Attendance updated successfully for student ID ${this.students[index].id}`, response);
        });
        alert('Attendance updated successfully');
      },
      error => {
        // Log any errors from the requests
        console.error('Error updating attendance:', error);
        alert('There was an error updating attendance. Please check the console for details.');
      }
    );
  }
  
  
  
}
