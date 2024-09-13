import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrl: './practice.component.css'
})
export class PracticeComponent {
  constructor(private router: Router) {}

  navigateTo(page: string) {
    switch(page) {
      case 'users':
        this.router.navigate(['/users']);
        break;
      case 'roles':
        this.router.navigate(['/roles']);
        break;
      case 'attendance':
        this.router.navigate(['/attendance']);
        break;
      case 'logout':
        // Perform logout action
        this.router.navigate(['/login']);
        break;
    }
  }
}
