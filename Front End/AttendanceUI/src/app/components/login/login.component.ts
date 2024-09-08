import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signupUsers: any[] = [];
  signupObj: any = {
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    role_id: '', // Store selected role ID here
    password: '',
    password2: ''
  };
  loginObj: any = {
    username: '',
    password: '',
    role_id:''
  };

  roles: any[] = [];  // Store roles here

  constructor(private accService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.fetchRoles(); // Fetch roles on initialization
  }

  // Fetch roles from the API
  fetchRoles() {
    this.accService.getRoles('rolepublic-roles/').subscribe({
      next: (res: any) => {
        this.roles = res.data;  // Assuming roles are in res.data
        console.log('Roles fetched:', this.roles);
      },
      error: (err) => {
        console.error('Error fetching roles', err);
      }
    });
  }
  onSignUp() {
    console.log('Signup Object:', this.signupObj); // Debugging line
    this.accService.addRecord('userregister', this.signupObj).subscribe({
      next: () => {
        this.signupObj = {
          first_name: '',
          last_name: '',
          username: '',
          email: '',
          role_id: '', // Reset role ID
          password: '',
          password2: ''
        };
        window.alert("Record Added Successfully");
      },
      error: (err) => {
        console.error('Signup error', err);
      }
    });
  }
  onLogin() {
    if (!this.loginObj.role_id) {
      window.alert('Role is not selected');
      return;
    }
  
    // Find the selected role object based on selected role_id
    const selectedRole = this.roles.find(role => role.id == this.loginObj.role_id);
    
    if (!selectedRole) {
      window.alert('Selected role is invalid');
      return;
    }
  
    // Step 1: Send loginObj to the API service for login
    this.accService.onLogin(this.loginObj).subscribe({
      next: (res: any) => {
        console.log('Login response:', res);
  
        
        localStorage.setItem('access', res.access);
  
        // Step 2: Use the token to get user profile (which contains role_id)
        this.accService.getUserDetails('userme').subscribe({
          next: (userRes: any) => {
            console.log('User profile response:', userRes.data.role_id,);
  
            // Assuming the user data contains role_id (e.g., userRes.role_id)
            if (userRes.data.role_id == this.loginObj.role_id) {
              console.log('Role matches');
              this.router.navigateByUrl(selectedRole.role_name);  // Navigate based on role_name
            } else {
              window.alert('Selected role does not match the user role');
            }
          },
          error: (err) => {
            console.error('User profile retrieval error', err);
          }
        });
      },
      error: (err) => {
        console.error('Login error', err);
      }
    });
  }
  
  
}
