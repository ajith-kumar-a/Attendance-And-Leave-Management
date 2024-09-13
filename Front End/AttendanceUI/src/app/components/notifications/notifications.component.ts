// notifications.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: any[] = [];
  user : any
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUSer()
  }

  loadUSer() : void {
    this.authService.getUserDetails('userme/').subscribe(
      (data) => {
        this.user = data.data;
        this.loadNotifications(this.user.id);
      },
      (error) => {
        console.error('Error fetching user details', error);
      }
    );
  }
  


  loadNotifications(userId : number): void {
    
    this.authService.getUserNotifications(userId).subscribe(
      (data: any) => {
        this.notifications = data;
        console.log('Notifications:', this.notifications);
      },
      (error) => {
        console.error('Error fetching notifications', error);
      }
    );
  }
}
