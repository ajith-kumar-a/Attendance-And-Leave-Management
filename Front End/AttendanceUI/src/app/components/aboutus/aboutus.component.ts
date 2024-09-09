import { Component } from '@angular/core';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css'] // Note: 'styleUrl' should be 'styleUrls'
})
export class AboutusComponent {
  backgroundImageUrl: string = 'assets/background.jpg';
  // Define the image paths
  leftImage = 'assets/About-left.jpg'; // Use your actual path
  rightImage = 'assets/About-right.webp'; // Use your actual path
  sideImage = 'assets/insitute.jpg'; // Use your actual path
  tcsLogo = 'assets/tcs-logo.jpg'; // Use your actual path
  cognizantLogo = 'assets/cognizant-logo.png'; // Use your actual path
  atosLogo = 'assets/atos-logo.png'; // Use your actual path
  hexawareLogo = 'assets/hexaware-logo.jpg'; // Use your actual path
  changepondLogo = 'assets/changepond-logo.jpg'; // Use your actual path

  constructor() {}
}
