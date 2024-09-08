import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-role-show',
  templateUrl: './role-show.component.html',
  styleUrl: './role-show.component.css'
})
export class RoleShowComponent {

  role: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getRoleDetails();  // Call the new function here
  }

  // New function to fetch role details
  getRoleDetails(): void {
    this.authService.getUserDetails('rolere/').subscribe(
      (data) => {
        this.role = data.data;
        console.log('role:', this.role);
      },
      (error) => {
        console.error('Error fetching user details', error);
      }
    );
  }

  // You can create more functions here if needed
}
