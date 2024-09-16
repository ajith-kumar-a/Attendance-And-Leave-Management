import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ListStudentsComponent } from '../list-students/list-students.component';
import { ListTeachersComponent } from '../list-teachers/list-teachers.component'; // Adjust path if needed
import { ListStaffComponent } from '../list-staff/list-staff.component'; // Adjust path if needed
import { ListAdminComponent } from '../list-admin/list-admin.component'; // Adjust path if needed
import { ListTeacherAttendanceComponent } from '../list-teacher-attendance/list-teacher-attendance.component';
import { ListStudentAttendanceComponent } from '../list-student-attendance/list-student-attendance.component';
import { ListStaffAttendanceComponent } from '../list-staff-attendance/list-staff-attendance.component';
import { StudentLeaveRequestStatusComponent } from '../student-leave-request-status/student-leave-request-status.component';
import { TeacherLeaveRequestStatusComponent } from '../teacher-leave-request-status/teacher-leave-request-status.component';
import { StaffLeaveRequestStatusComponent } from '../staff-leave-request-status/staff-leave-request-status.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  user : any

  img : any

  ngOnInit(): void {
    this.fetchStudentDetails();
  }
  baseUrl: string = 'http://172.17.7.109:8000';

  constructor(
    private AuthService: AuthService,
    private modalService: NgbModal
  ) {}


  fetchStudentDetails(): void {
    this.AuthService.getUserDetails('userme/').subscribe(
      (data) => {
        this.user = data.data;
       
        this.img = `${this.baseUrl}${this.user.profile_picture}`;
       
 
      },
      (error) => {
        console.error('Error fetching user details', error);
      }
    );
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

  // Open modals based on role selection
  onRoleChange(roleId: string): void {
    switch (roleId) {
      case '1':
        this.openModal(StudentLeaveRequestStatusComponent);
        break;
      case '2':
        this.openModal(TeacherLeaveRequestStatusComponent);
        break;
      case '3':
        this.openModal(StaffLeaveRequestStatusComponent);
        break;
      default:
        console.error('Invalid role selected');
    }
  }
  
  // Open a modal and pass in the correct component
  openModal(component: any): void {
    const modalRef = this.modalService.open(component, { centered: true, size: 'lg' });
    modalRef.result.then(
      (result) => console.log('Modal closed with result:', result),
      (reason) => console.log('Modal dismissed with reason:', reason)
    );
  }
}
