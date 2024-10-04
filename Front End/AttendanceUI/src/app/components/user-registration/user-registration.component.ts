import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';  // Adjust the path based on your project structure
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common'; // Import Location service


@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  userDetails: any = {
    date_of_birth: '',
    mentor_name: '',  // Will be updated based on selected mentor
    mobile_number: '',
    aadhar_number: '',
    batch: '',
    blood_group: '',
    gender: '',
    user_id: null  // Ensure this is set to the current user ID (integer)
  };

  mentors: any[] = [];  // List of mentors
  currentUser: any;    // Stores current user data
  role_id: any;
  roles: any[] = [];  // Store roles here
  isMentorSelectionDisabled: boolean = false;
  isLoading: boolean = false; // Loading state
  isCursorVisible: boolean = true; // Cursor visibility state

  constructor(private authService: AuthService, private router: Router,
    private location: Location 

  ) {}

  ngOnInit(): void {
    this.fetchCurrentUser();
    // this.fetchMentors();
    this.fetchRoles()
  }

  // Fetch the current user details
  fetchCurrentUser() {
    this.authService.getUserDetails("userme/").subscribe({
      next: (res: any) => {
        this.currentUser = res.data;  // Adjust according to the API response structure
        console.log('Current user fetched:', this.currentUser);
        this.role_id = this.currentUser.role_id
        this.userDetails.user_id = this.currentUser.id;  // Set user_id to user's ID (integer)
        let mentor = this.currentUser.role_id == 2 ? this.currentUser.role_id+2 : this.currentUser.role_id+1
       
        this.fetchMentors(mentor)
      },
      error: (err: any) => {
        console.error('Error fetching current user:', err);
      }
    });
  }


  // Fetch the list of mentors based on a specific role_id
  fetchMentors(roleId: number) {  // Provide a default roleId or obtain it dynamically
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

  // Update mentor_name based on selected mentor ID
  updateMentorName() {
    const selectedMentor = this.mentors.find(m => m.id == this.userDetails.mentor_name);
    if (selectedMentor) {
      this.userDetails.mentor_name = selectedMentor.username;  // Set mentor_name
    } else {
      this.userDetails.mentor_name = '';  // Clear mentor_name if no mentor is selected
    }
  }

  // Fetch roles (if necessary for any additional logic)
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


  // Method to handle form submission
  onSubmit(form: NgForm) {
    if (!this.userDetails.mentor_name) {
      window.alert('Mentor name is required.');
      return;
    }

    const selectedRole = this.roles.find(role => role.id == this.role_id);
    if (!selectedRole) {
      window.alert('Selected role is invalid');
      return;
    }

    console.log('Submitting User Details:', this.userDetails);
    
    // Prepare request payload
    const requestPayload = { 
      ...this.userDetails, 
      user_id: this.currentUser.id,  // Ensure user_id is an integer
    };

    this.authService.addRecord('Details-Useruserdetails/', requestPayload).subscribe({
      next: (response: any) => {
        console.log('User registration successful:', response);
        window.alert('User registration successful');
        this.router.navigateByUrl(selectedRole.role_name);  // Navigate based on role_name
        this.resetForm();
      },
      error: (err: any) => {
        console.error('User registration failed:', err);
        window.alert('User registration failed. Please try again.');
      }
    });
  }

  // Reset the form
  resetForm() {
    this.userDetails = {
      date_of_birth: '',
      mentor_name: '',  // Reset mentor_name
      mobile_number: '',
      aadhar_number: '',
      batch: '',
      blood_group: '',
      gender: '',
      user_id: null  // Reset user_id
    };
  }
  back(): void {
    this.location.back(); // Navigate back to the previous page
  }
  hideCursor() {
    this.isCursorVisible = false;
  }

  resetCursor() {
    this.isCursorVisible = true;
  }
  
}
