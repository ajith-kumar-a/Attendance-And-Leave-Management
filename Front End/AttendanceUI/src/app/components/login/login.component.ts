// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css'
// })
// export class LoginComponent {

// }

import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        // Handle successful login
        this.successMessage = 'Login successful!';
        this.errorMessage = '';

        // Optional: Redirect to another page upon successful login
        this.router.navigate(['/dashboard']); // Replace '/dashboard' with the route you want to navigate to
      },
      error: (error) => {
        // Handle login error
        this.errorMessage = 'Login failed. Please check your username and password.';
        this.successMessage = '';
      }
    });
  }
}
