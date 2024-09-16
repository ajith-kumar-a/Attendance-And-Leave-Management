import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Location } from '@angular/common'; // Import Location service


@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.css']
})
export class DummyComponent {
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

