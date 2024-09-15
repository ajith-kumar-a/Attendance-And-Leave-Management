import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css'] // Fixed the typo from 'styleUrl' to 'styleUrls'
})
export class PracticeComponent {
    // backgroundImages: string[] = [
    //   'assets/About-left.jpg',
    //   'assets/About-right.webp',
    //   'assets/background.jpg',
    //   'assets/insitute.jpg'
    // ];
  
  
    // backgroundImageUrl: string = 'assets/background.jpg';
  
    // Define image paths as properties
    // heroImage = 'assets/hero-bg.jpg';
    studentImage = 'assets/student.jpg';
  
    categoryImages = {
      webDesign: 'assets/About-right.webp',
      graphicDesign: 'assets/grapic-design.jpg',
      dataScience: 'assets/student.jpg',
      onlineMarketing: 'assets/About-left.jpg',
      ai: 'assets/insitute.jpg'
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
        name: 'prasanth',
        profession: 'Python',
        image: 'assets/prasanth.png',
        feedback: 'The best online course I have ever taken. Instructors were highly knowledgeable and the course material was very practical.'
      },
      {
        name: 'ajith',
        profession: 'Java',
        image: 'assets/ajith.jpg',
        feedback: 'Engaging content and really good support from instructors. I could complete the course at my own pace.'
      },
      {
        name: 'gokul',
        profession: 'Sql',
        image: 'assets/client3.jpg',
        feedback: 'The assignments were challenging and rewarding. I would highly recommend this platform to anyone.'
      }
    ];
    
    getImagePath(imageName: string): string {
      return `assets/${imageName}`;
    }
  }
