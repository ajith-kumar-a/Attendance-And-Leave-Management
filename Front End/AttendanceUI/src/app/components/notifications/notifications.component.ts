import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: any[] = [];
  user: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
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

  loadNotifications(userId: number): void {
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

  // Handle swipe right using Hammer.js
  onSwipeRight(notification: any): void {
    console.log('Right swipe detected on notification:', notification);
    this.deleteNotification(notification);
  }

  deleteNotification(notification: any): void {
    notification.deleting = true;  // Add a 'deleting' flag to apply animation

    setTimeout(() => {
      this.authService.deleteNotification(this.user.id, notification.id).subscribe(
        (response) => {
          this.notifications = this.notifications.filter(
            (notif) => notif.id !== notification.id
          );
          console.log('Notification deleted:', response);
        },
        (error) => {
          console.error('Error deleting notification', error);
        }
      );
    }, 500); // Delay to allow animation to finish
  }
}
