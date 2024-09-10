import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';  // Import OnInit
import { AuthService } from '../../services/auth.service';  // Assuming you're using an AuthService for user data

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {  // Implement OnInit lifecycle hook
  user: any;

  // Mark fileInput as non-nullable using the '!' operator
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Fetch user details and log them
    this.authService.getUserDetails('userm/e').subscribe(
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
      },
      (error) => {
        console.error('Error fetching user details', error);
      }
    );
  }

  // Trigger file input click
  openFileDialog(): void {
    this.fileInput.nativeElement.click();
  }

  // Handle file change event
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log('Selected file:', file);
      // Handle file upload logic here
    }
  }
}
