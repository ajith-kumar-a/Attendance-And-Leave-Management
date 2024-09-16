import { Component } from '@angular/core';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css'] // Correct property name
})
export class LandingpageComponent {
  // backgroundImages: string[] = [
  //   'assets/About-left.jpg',
  //   'assets/About-right.webp',
  //   'assets/background.jpg',
  //   'assets/insitute.jpg'
  // ];


  // backgroundImageUrl: string = 'assets/background.jpg';

  // Define image paths as properties
  // heroImage = 'assets/hero-bg.jpg';
  hello = 'assets/hello.gif';

  categoryImages = {
    webDesign: 'assets/webdesign.jpg',
    graphicDesign: 'assets/grapic-design.jpg',
    dataScience: 'assets/data-science.jpg',
    DigitalMarketing: 'assets/Digital-marketing.jpg',
    ai: 'assets/ai.jpg'
  };
  courseImages = {
    pythonFullStack: 'assets/About-left.jpg',
    javaFullStack: 'assets/About-right.webp',
    dotnetFullStack: 'assets/insitute.jpg',
    dataScience: 'assets/student.jpg'
  };
  instructorImages = {
    instructor1: 'assets/ajith.jpg',
    instructor2: 'assets/prasanth.png',
    instructor3: 'assets/instructor3.jpg'
  };

  testimonials = [
    {
      name: 'Manoj',
      profession: 'Fullstack',
      image: 'assets/pic1.jpg',
      feedback: 'The best online course I have ever taken. Instructors were highly knowledgeable and the course material was very practical.'
    },
    {
      name: 'Priya',
      profession: 'Backend',
      image: 'assets/pic.jpg',
      feedback: 'Engaging content and really good support from instructors. I could complete the course at my own pace.'
    },
    {
      name: 'John',
      profession: 'Sql',
      image: 'assets/pic3.jpg',
      feedback: 'The assignments were challenging and rewarding. I would highly recommend this platform to anyone.'
    }
  ];
  
  getImagePath(imageName: string): string {
    return `assets/${imageName}`;
  }
}
