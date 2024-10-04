import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListStudentsComponent } from '../list-students/list-students.component';
import { ListTeachersComponent } from '../list-teachers/list-teachers.component';
import { ListStaffComponent } from '../list-staff/list-staff.component';
import { ListTeacherAttendanceComponent } from '../list-teacher-attendance/list-teacher-attendance.component';
import { ListStudentAttendanceComponent } from '../list-student-attendance/list-student-attendance.component';
import { ListStaffAttendanceComponent } from '../list-staff-attendance/list-staff-attendance.component';
import { StudentLeaveRequestStatusComponent } from '../student-leave-request-status/student-leave-request-status.component';
import { TeacherLeaveRequestStatusComponent } from '../teacher-leave-request-status/teacher-leave-request-status.component';
import { StaffLeaveRequestStatusComponent } from '../staff-leave-request-status/staff-leave-request-status.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  roles = [
    {
      id: 'studentDropdown',
      name: 'Student',
      icon: 'fas fa-user-graduate',
      items: [
        { id: '1', label: 'Student Profile' },
        { id: '4', label: 'Student Attendance' },
        { id: '7', label: 'Student Leave Status' }
      ]
    },
    {
      id: 'teacherDropdown',
      name: 'Teacher',
      icon: 'fas fa-chalkboard-teacher',
      items: [
        { id: '2', label: 'Teacher Profile' },
        { id: '5', label: 'Teacher Attendance' },
        { id: '8', label: 'Teacher Leave Status' }
      ]
    },
    {
      id: 'staffDropdown',
      name: 'Staff',
      icon: 'fas fa-users',
      items: [
        { id: '3', label: 'Staff Profile' },
        { id: '6', label: 'Staff Attendance' },
        { id: '9', label: 'Staff Leave Status' }
      ]
    }
  ];

  isDropdownOpen: string | null = null;

  // constructor(private modalService: NgbModal) {}

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

  toggleDropdown(roleId: string) {
    this.isDropdownOpen = this.isDropdownOpen === roleId ? null : roleId;
  }

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

  onRoleChange(roleId: string): void {
    switch (roleId) {
      case '1':
        this.openModal(ListStudentsComponent);
        break;
      case '2':
        this.openModal(ListTeachersComponent);
        break;
      case '3':
        this.openModal(ListStaffComponent);
        break;
      case '4':
        this.openModal(ListStudentAttendanceComponent);
        break;
      case '5':
        this.openModal(ListTeacherAttendanceComponent);
        break;
      case '6':
        this.openModal(ListStaffAttendanceComponent);
        break;
      case '7':
        this.openModal(StudentLeaveRequestStatusComponent);
        break;
      case '8':
        this.openModal(TeacherLeaveRequestStatusComponent);
        break;
      case '9':
        this.openModal(StaffLeaveRequestStatusComponent);
        break;
      default:
        console.error('Invalid role selected');
    }
  }
  
  openModal(component: any): void {
    const modalRef = this.modalService.open(component, { centered: true, size: 'lg' });
    modalRef.result.then(
      (result) => console.log('Modal closed with result:', result),
      (reason) => console.log('Modal dismissed with reason:', reason)
    );
  }
}
