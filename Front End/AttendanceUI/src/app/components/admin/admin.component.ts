import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  user : any

  img : any

  ngOnInit(): void {
    this.fetchStudentDetails();
  }
  baseUrl: string = 'http://127.0.0.1:8000';

  constructor(
    private AuthService: AuthService,
  ) {}


  fetchStudentDetails(): void {
    this.AuthService.getUserDetails('userme/').subscribe(
      (data) => {
        this.user = data.data;
       
        this.img = `${this.baseUrl}${this.user.profile_picture}`;
       
 
      },
      (error) => {
        console.error('Error fetching user details', error);
      }
    );
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profile_picture', file);

      this.AuthService.updateProfilePicture(this.user.id, formData).subscribe(
        (response) => {
          this.user.profile_picture = response.data.profile_picture;
          this.img = `${this.baseUrl}${this.user.profile_picture}`;
        },
        (error) => {
          console.error('Error updating profile picture', error);
        }
      );
    }
  }
 
}
