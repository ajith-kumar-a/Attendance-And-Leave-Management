import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {  // Implement OnInit lifecycle hook
   user: any;
    user_details:any;
    img: any;
    attendance: any[] = [];
    statusMap: any[] = [];
    leaveRequest: any = {
      leaveType: '',
      reason: '',
      startDate: '',
      endDate: ''
    };
    leaveRequests: any[] = [];
    previousLeaveRequests: any[] = []; // Track previous statuses
    previousAttendanceStatuses: any[] = []; // Track previous attendance statuses
    badgeCount: number = -12; // Initialize to 0
    private intervalId: any; 
    private leaveRequestSubscription: Subscription | undefined;

    hasUserDetails: boolean = false; 
    canEditDetails: boolean = false;

    baseUrl: string = 'http://127.0.0.1:8000';
    @ViewChild('fileInput') fileInput!: ElementRef;

    constructor(
      private AuthService: AuthService,
      private cd: ChangeDetectorRef // Add ChangeDetectorRef
    ) {}

    ngOnInit(): void {
      this.fetchStudentDetails();
      this.fetchStatusDetails();
      this.checkLeaveRequestUpdates(); // Check for leave request updates
      this.checkAttendanceStatusUpdates(); // Check for attendance status updates
      

      // Set up polling for leave request and attendance status updates
      this.intervalId = setInterval(() => {
        this.checkLeaveRequestUpdates();
        this.checkAttendanceStatusUpdates();
      }, 55000); // Poll every 15 seconds
    }

    ngOnDestroy(): void {
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
      if (this.leaveRequestSubscription) {
        this.leaveRequestSubscription.unsubscribe();
      }
    }

    fetchStudentAttendance(userId: number, startDate?: string, endDate?: string): void {
      let start = new Date(startDate as string);
      let end = new Date(endDate as string);
      let filteredAttendance = [];

      this.AuthService.getUserDetails(`Attendancedetail/by-user/${userId}/`).subscribe(
        (data: any) => {
          for (let i = 0; i < data.data.length; i++) {
            let entryDate = new Date(data.data[i].date);
            if (entryDate >= start && entryDate <= end) {
              filteredAttendance.push(data.data[i]);
            }
          }
          this.attendance = filteredAttendance;
          console.log('Filtered Attendance:', this.attendance); // Log filtered attendance
        },
        (error: any) => {
          console.error('Error fetching attendance details', error);
        }
      );
    }

    fetchStudentDetails(): void {
      this.AuthService.getUserDetails('userme/').subscribe(
        (data) => {
          this.user = data.data;
          this.fetchStudentAttendance(this.user.id);
          this.fetchStudentallDetails(this.user.id)
          this.img = `${this.baseUrl}${this.user.profile_picture}`;
          this.checkLeaveRequestUpdates(); // Check for leave request updates
          this.checkAttendanceStatusUpdates(); // Check for attendance status updates

        },
        (error) => {
          console.error('Error fetching user details', error);
        }
      );
    }

    fetchStudentallDetails(id:any): void {
      this.AuthService.getUserDetails(`Details-Useruserdetails/by-user/${id}/`).subscribe(
        (data) => {
          this.user_details = data;
          console.log(" this.user_details : ", this.user_details)
          this.hasUserDetails = !!data[0].blood_group;
          this.canEditDetails = !!data[0].blood_group;

          console.log("this.hasUserDetails :" ,this.hasUserDetails)
          console.log("this.hasUserDetails :" ,this.hasUserDetails)
        },
        (error) => {
          console.error('Error fetching user details', error);
        }
      );
    }



    fetchStatusDetails(): void {
      this.AuthService.getUserDetails('Attendancestatus/').subscribe(
        (data) => {
          this.statusMap = data.data;
          console.log('Status Map:', this.statusMap); // Log status map
        },
        (error) => {
          console.error('Error fetching status details', error);
        }
      );
    }

    checkLeaveRequestUpdates(): void {
      if (this.user && this.user.id) {
        this.AuthService.getLeaveRequestDetailsByUser(this.user.id).subscribe(
          (data: any) => {
            const newRequests = data.data;
            console.log('New Leave Requests:', newRequests); // Log new leave requests

            let newBadgeCount = 0;
            let updatedLeaveRequests = [...this.leaveRequests];
            const requestMap = new Map(this.leaveRequests.map(r => [r.id, r]));
            console.log(" requestMap :",requestMap)

            newRequests.forEach((request: any) => {
              if (requestMap.has(request.id)) {
                const existingRequest = requestMap.get(request.id);
                console.log("Leave Request  existingRequest.status : ",existingRequest.status ," request.status : ",request.status )

                if (existingRequest.status !== request.status) {
                  // console.log("Leave Request  existingRequest.status : ",existingRequest.status ," request.status : ",request.status )
                  newBadgeCount++;
                  existingRequest.status = request.status;
                }
              } else {
                updatedLeaveRequests.push(request);
                newBadgeCount++;
              }
            });
            this.leaveRequests = updatedLeaveRequests;
            this.badgeCount += newBadgeCount; // Update badge count
            console.log('Updated Leave Requests:', this.leaveRequests); // Log updated leave requests
            console.log('Badge Count:', this.badgeCount); // Log badge count
          },
          (error) => {
            console.error('Error checking leave request updates', error);
          }
        );
      }
    }

    checkAttendanceStatusUpdates(): void {
      if (this.user && this.user.id) {
        this.AuthService.getUserDetails(`Attendancedetail/by-user/${this.user.id}/`).subscribe(
          (data: any) => {
            const newStatuses = data.data; // Assuming this contains attendance details
            console.log('New Attendance Statuses:', newStatuses);

            let newBadgeCount = 0;
            let updatedAttendanceStatuses = [...this.previousAttendanceStatuses];
            const statusMap = new Map(this.previousAttendanceStatuses.map(s => [s.id, s]));

            newStatuses.forEach((status: any) => {
              console.log("status : ",status)
              if (statusMap.has(status.id)) {
                console.log(" statusMap :",statusMap)
                const existingStatus = statusMap.get(status.id);
                console.log(" existingStatus : ",status)

                console.log("Attendance    existingRequest.status : ",existingStatus.status_id ," request.status : ",status.status_id )

                if (existingStatus.status !== status.status) {

                  newBadgeCount++;
                  existingStatus.status = status.status;
                }
              } else {
                updatedAttendanceStatuses.push(status);
                newBadgeCount++;
              }
            });

            this.previousAttendanceStatuses = updatedAttendanceStatuses;
            this.badgeCount += newBadgeCount; // Update badge count
            console.log('Updated Attendance Statuses:', this.previousAttendanceStatuses); // Log updated statuses
            console.log('Badge Count:', this.badgeCount); // Log badge count
          },
          (error) => {
            console.error('Error checking attendance status updates', error);
          }
        );
      }
    }

    applyFilter(): void {
      this.fetchStudentAttendance(this.user.id, this.leaveRequest.startDate, this.leaveRequest.endDate);
    }

    onFileChange(event: any): void {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('profile_picture', file);

        this.AuthService.updateProfilePicture(this.user.id, formData).subscribe(
          (response) => {
            this.user.profile_picture = response.data.profile_picture;
            this.img = `${this.baseUrl}${this.user.profile_picture}`;
          },
          (error) => {
            console.error('Error updating profile picture', error);
          }
        );
      }
    }
  downloadCSV() {
    let csvData = '';
    const headers = ['S.No', 'Date', 'Status', 'Remarks', 'Login Time', 'Logout Time'];
  
    // Adding headers
    csvData += headers.join(',') + '\n';
  
    // Adding attendance data
    this.attendance.forEach((entry, index) => {
      const row = [
        index + 1, // S.No
        `\t${entry.date}`, // Date prefixed with tab to treat as text in Excel
        this.statusMap[entry.status_id - 1]?.status || 'Unknown', // Status
        entry.remarks, // Remarks
        entry.login_time, // Login Time
        entry.logout_time // Logout Time
      ];
      csvData += row.join(',') + '\n';
    });
  
    // Create a Blob and download it as CSV
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'attendance.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }


}
