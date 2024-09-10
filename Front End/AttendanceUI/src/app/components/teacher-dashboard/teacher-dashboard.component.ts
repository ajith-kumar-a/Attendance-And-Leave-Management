import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrl: './teacher-dashboard.component.css'
})
export class TeacherDashboardComponent implements OnInit{
  user:any;
  constructor(private AuthService: AuthService) {}

  ngOnInit(): void {
    this.AuthService.getUserDetails('userme/').subscribe(
      (data) => {
        this.user = data.data;
        console.log('Full user object:', this.user);

          // Log individual properties
          console.log('First Name:', this.user.first_name);
          console.log('Last Name:', this.user.last_name);
          console.log('Email:', this.user.email);
          console.log('Phone:', this.user.phone);
          console.log('Course:', this.user.course);
          console.log('Address:', this.user.address);
          

          // Add more logs as needed based on the properties of the user object
        },
        (error) => {
          console.error('Error fetching user details', error);
        }
      );
    }
  }
