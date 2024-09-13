import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-list-staff',
  templateUrl: './list-staff.component.html',
  styleUrl: './list-staff.component.css'
})
export class ListStaffComponent {
  users: any[] = []; 
  roleId: number = 3; // Single role ID to fetch users
  roleUsers: any[] = [];

  constructor(private userService: AuthService) { }

  ngOnInit(): void {
    this.loadUsersByRole();
  }

  loadUsersByRole(): void {
    this.userService.getLeaveRequestDetails('userusers/by-role/', this.roleId).subscribe(
      (data) => {
        this.roleUsers = data.data; // Assuming the API returns an array of users for the given role
        console.log(`Role ${this.roleId}:`, this.roleUsers);
      },
      (error) => {
        console.error(`Error fetching users for role ${this.roleId}`, error);
      }
    );
  }

  getCardClass(roleId: number): string {
    switch(roleId) {
      case 1:
        return 'role-1-border';
      case 2:
        return 'role-2-border';
      case 3:
        return 'role-3-border';
      default:
        return '';
    }
  }
}
