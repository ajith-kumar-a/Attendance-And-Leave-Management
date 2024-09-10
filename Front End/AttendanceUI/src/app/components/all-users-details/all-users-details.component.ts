import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-all-users-details',
  templateUrl: './all-users-details.component.html',
  styleUrls: ['./all-users-details.component.css']
})
export class AllUsersDetailsComponent implements OnInit {
  users: any[] = []; 
  roleIds: number[] = [1, 2, 3, 4]; // Example role IDs
  teachers: any[] = [];


  constructor(private userService: AuthService) { }

  ngOnInit(): void {
    this.loadUsers();
    this.loadUsersByRoles();
  }

  loadUsers(): void {
    this.userService.getUserDetails('userall/').subscribe(
      (data) => {
        this.users = data; // Assuming the API returns an array of users
        console.log(this.users); // Optional: log the data to check
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  loadUsersByRoles(): void {
    this.roleIds.forEach(roleId => {
      this.userService.getLeaveRequestDetails('userusers/by-role/',roleId).subscribe(
        (data) => {
          // Assuming each API call returns an array of users for the given role
          this.teachers.push({
            roleId,
            users: data.data
          });
          console.log(`Role ${roleId}:`, data.data);
        },
        (error) => {
          console.error(`Error fetching users for role ${roleId}`, error);
        }
      );
    });
  }
}
