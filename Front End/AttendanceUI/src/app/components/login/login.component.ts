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
  userId:any;
  signupObj: any = {
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    role_id: '', // Store selected role ID here
    password: '',
    password2: '',
    profile_picture:'https://bootdey.com/img/Content/avatar/avatar7.png',
  };
  loginObj: any = {
    username: '',
    password: '',
    role_id:''
  };
  roles: any[] = [];  // Store roles here

  constructor(private accService: AuthService, private router: Router) {}

  ngOnInit(): void {
    localStorage.clear();
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
    // this.checkmarkAttendance()
  }
  onSignUp() {
    // Basic validation
    if (!this.signupObj.first_name || !this.signupObj.last_name || !this.signupObj.username ||
        !this.signupObj.email || !this.signupObj.password || !this.signupObj.password2) {
      window.alert("Please fill out all required fields.");
      return;
    }
  
    // Validate first name and last name length
    if (this.signupObj.first_name.length < 5) {
      window.alert("First name must be at least 5 characters long.");
      return;
    }
  
    if (this.signupObj.last_name.length < 5) {
      window.alert("Last name must be at least 5 characters long.");
      return;
    }
  
    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.signupObj.email)) {
      window.alert("Please enter a valid email address.");
      return;
    }
  
    // Validate password
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (this.signupObj.password.length < 8) {
      window.alert("Password must be at least 8 characters long.");
      return;
    }
  
    if (!passwordPattern.test(this.signupObj.password)) {
      window.alert("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
      return;
    }
  
    // Check if passwords match
    if (this.signupObj.password !== this.signupObj.password2) {
      window.alert("Passwords do not match.");
      return;
    }
  
    // If validation passes, proceed with registration
    console.log('Signup Object:', this.signupObj); // Debugging line
    this.accService.RegisterUser('userregister/', this.signupObj).subscribe({
      next: () => {
        // Reset form fields
        this.signupObj = {
          first_name: '',
          last_name: '',
          username: '',
          email: '',
          role_id: '', // Reset role ID
          password: '',
          password2: ''
        };
        window.alert("Record Added Successfully. Now you can login using your credentials.");
  
        // Optional: Redirect after successful registration
        // this.router.navigateByUrl("user-registration");
      },
      error: (err) => {
        console.error('Signup error', err);
        window.alert("An error occurred during signup. Please try again.");
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
        this.accService.getUserDetails('userme/').subscribe({
          next: (userRes: any) => {
            console.log('User profile response:', userRes.data.id,);
            this.userId=userRes.data.id
            // Assuming the user data contains role_id (e.g., userRes.role_id)
            if (userRes.data.role_id == this.loginObj.role_id) {
              console.log('Role matches');
              this.router.navigateByUrl(selectedRole.role_name);  // Navigate based on role_name
              
              // this.checkmarkAttendance( userRes.data.id)
              // this.markAttendance( userRes.data.id)
              this.handleAttendance(userRes.data.id)
            } else {
              window.alert('Selected role does not match the user role');
            }
          },
          error: (err) => {
            console.error('User profile retrieval error', err);
          }
        });
        // this.markAttendance(this.userId)
      },
      error: (err) => {
        console.error('Login error', err);
        window.alert("No active account found with the given credentials")
      }
    });


  }
  checkmarkAttendance(userId: any): Promise<boolean> {
    const today: string = new Date().toISOString().split('T')[0];
  
    return new Promise((resolve, reject) => {
      this.accService.getUserDetails(`Attendancedetail/by-user/${userId}/`).subscribe({
        next: (res: any) => {
          let isAttendanceMarked = false;
          for (let i = 0; i < res.data.length; i++) {
            if (today === res.data[i].date) {
              console.log("Attendance is already taken for today.");
              isAttendanceMarked = true;
              break; // No need to check further if attendance is already marked
            }
          }
  
          if (isAttendanceMarked) {
            resolve(false); // Attendance is already taken
          } else {
            console.log("Attendance is not added.");
            resolve(true); // Attendance can be marked
          }
        },
        error: (err) => {
          console.error('Error fetching attendance data:', err);
          reject(err); // In case of an error
        }
      });
    });
  }
  
  
  markAttendance(userId: number): void {
    const attendanceObj = {
      
      user_id: userId,
      date: new Date().toISOString().split('T')[0],  // Today's date
      status_id: 3,  // Adjust based on your API's attendance schema
      login_time: new Date().toISOString() , // Current time as login time
      remarks:'welcome to gap '
    };
    console.log('ioryuewrioey',userId)
  
    this.accService.addRecord('Attendancedetail/', attendanceObj).subscribe({
      next: () => {
        console.log('Attendance marked successfully');
      },
      error: (err) => {
        console.error('Error marking attendance', err);
      }
    });
  }
  async handleAttendance(userId: number): Promise<void> {
    try {
      const canMarkAttendance = await this.checkmarkAttendance(userId);

      if (canMarkAttendance) {
        this.markAttendance(userId); // Mark attendance if not already marked
      } else {
        console.log('Attendance is already marked for today.');
      }
    } catch (error) {
      console.error('Error checking/marking attendance:', error);
    }
  }
  
  
}
 