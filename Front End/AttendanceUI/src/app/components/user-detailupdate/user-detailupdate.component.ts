import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';  // Adjust the path based on your project structure

@Component({
  selector: 'app-user-detailupdate',
  templateUrl: './user-detailupdate.component.html',
  styleUrls: ['./user-detailupdate.component.css']
})
export class UserDetailupdateComponent implements OnInit {
  userDetails: any = {
    date_of_birth: '',
    mentor_name: '',
    mobile_number: '',
    aadhar_number: '',
    batch: '',
    blood_group: '',
    gender: ''
  };

  mentors: any[] = [];  // List of mentors
  roles: any[] = [];  // Store roles here
  role_id: any;  // Current user's role_id
  currentUser: any;  // Stores current user data
  userId: any;  // The ID of the user to be updated

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchCurrentUser();
    this.fetchMentors();
    this.fetchRoles();
  }

  fetchCurrentUser() {
    this.authService.getUserDetails("userme/").subscribe({
      next: (res: any) => {
        this.currentUser = res.data;  // Adjust according to the API response structure
        this.role_id = this.currentUser.role_id;
        this.userId = this.currentUser.id;  // Set the userId to the current user's ID
        this.fetchUserDetails(this.userId);
      },
      error: (err: any) => {
        console.error('Error fetching current user:', err);
      }
    });
  }

  // Fetch user details based on user_id
  fetchUserDetails(user_id: any) {
    this.authService.getUserDetailsById(user_id).subscribe({
      next: (res: any) => {
        this.userDetails = res.data;  // Adjust according to API response structure
        console.log('User details fetched:', this.userDetails);
      },
      error: (err: any) => {
        console.error('Error fetching user details:', err);
      }
    });
  }

  // Fetch the list of mentors based on a specific role_id
  fetchMentors(roleId: number = 2) {  // Provide a default roleId or obtain it dynamically
    this.authService.getUsersByRole(roleId).subscribe({
      next: (res: any) => {
        this.mentors = res.data;  // Adjust according to the API response structure
        console.log('Mentors fetched:', this.mentors);
      },
      error: (err: any) => {
        console.error('Error fetching mentors:', err);
      }
    });
  }

  // Fetch roles
  fetchRoles() {
    this.authService.getRoles('rolepublic-roles/').subscribe({
      next: (res: any) => {
        this.roles = res.data;  // Assuming roles are in res.data
        console.log('Roles fetched:', this.roles);
      },
      error: (err) => {
        console.error('Error fetching roles', err);
      }
    });
  }

  // Update user details
  updateUserDetails() {
    console.log("this.role_id : ", this.role_id);
    console.log("this.roles : ", this.roles);

    const selectedRole = this.roles.find(role => role.id == this.role_id);
    console.log("selectedRole : ", selectedRole);

    if (!selectedRole) {
      window.alert('Selected role is invalid');
      return;
    }

    console.log('Updating User Details:', this.userDetails);

    this.authService.updateUserDetails(this.userId, this.userDetails).subscribe({
      next: (response: any) => {
        console.log('User details updated successfully:', response);
        window.alert('User details updated successfully');
        this.router.navigateByUrl(selectedRole.role_name);  // Navigate based on role_name
      },
      error: (err: any) => {
        console.error('User details update failed:', err);
        window.alert('Failed to update user details. Please try again.');
      }
    });
  }
}
