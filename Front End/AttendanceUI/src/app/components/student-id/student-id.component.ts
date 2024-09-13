import { Component,ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
 

@Component({
  selector: 'app-student-id',
  templateUrl: './student-id.component.html',
  styleUrl: './student-id.component.css'
})
export class StudentIdComponent {
  userData: any;  // Variable to store fetched user data
  baseUrl: string = 'http://127.0.0.1:8000';
  @ViewChild('contentToConvert', { static: false }) contentToConvert!: ElementRef;

  constructor(private userService: AuthService) {}

  ngOnInit(): void {
    this.fetchUserDetails();
  }

  // Function to fetch user details using the service
  fetchUserDetails(): void {
    this.userService.getUserDetails('userme/').subscribe(
      (data: any) => {
        this.userData = data.data;  // Assign the fetched data to userData
        this.userData.profile_picture=`${this.baseUrl}${this.userData.profile_picture}`
        console.log('User Data fetched:', this.userData);  // Log the user data
      },
      (error) => {
        console.error('Error fetching user details:', error);  // Handle any errors
      }
    );
  }
  

  // Method to download the ID card as PDF
  downloadPDF() {
    const element = this.contentToConvert.nativeElement;

    html2canvas(element, {
      scale: 2, // Increase quality of the canvas image
      useCORS: true // Ensure cross-origin images are included
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // Width in mm for A4 page
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('id-card.pdf');
    }).catch(error => {
      console.error('Error capturing the card:', error);
    });
  }
}
