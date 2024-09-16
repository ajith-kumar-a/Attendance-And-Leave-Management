import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListStudentsComponent } from '../list-students/list-students.component';
import { ListTeachersComponent } from '../list-teachers/list-teachers.component'; // Adjust path if needed
import { ListStaffComponent } from '../list-staff/list-staff.component'; // Adjust path if needed
import { ListAdminComponent } from '../list-admin/list-admin.component'; // Adjust path if needed
import { ListTeacherAttendanceComponent } from '../list-teacher-attendance/list-teacher-attendance.component';
import { ListStudentAttendanceComponent } from '../list-student-attendance/list-student-attendance.component';
import { ListStaffAttendanceComponent } from '../list-staff-attendance/list-staff-attendance.component';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  constructor(private modalService: NgbModal) {}

  // Open modals based on role selection
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
