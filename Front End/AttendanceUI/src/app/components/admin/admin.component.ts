import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListStudentsComponent } from '../list-students/list-students.component';
import { ListTeachersComponent } from '../list-teachers/list-teachers.component'; // Make sure to adjust the path
import { ListStaffComponent } from '../list-staff/list-staff.component'; // Make sure to adjust the path
import { ListAdminComponent } from '../list-admin/list-admin.component'; // Make sure to adjust the path

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  constructor(private modalService: NgbModal) {}

  onRoleChange(event: any): void {
    const selectedRole = event.target.value;

    switch (selectedRole) {
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
        this.openModal(ListAdminComponent);
        break;
      default:
        console.log('No component available for selected role');
    }
  }

  openModal(component: any): void {
    const modalRef = this.modalService.open(component, { centered: true });
    modalRef.result.then((result) => {
      console.log('Modal closed with:', result);
    }, (reason) => {
      console.log('Modal dismissed with:', reason);
    });
  }
}
