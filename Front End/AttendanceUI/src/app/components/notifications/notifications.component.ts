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
  private touchStartX: number = 0;
  private touchEndX: number = 0;

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

  // Handle touch start event
  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  // Handle touch end event
  onTouchEnd(event: TouchEvent, notification: any): void {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipe(notification);
  }

  // Detect a right swipe and delete the notification
  private handleSwipe(notification: any): void {
    const SWIPE_THRESHOLD = 75; // Minimum distance for a swipe gesture
    if (this.touchEndX - this.touchStartX > SWIPE_THRESHOLD) {
      // Right swipe detected
      console.log('Right swipe detected. Deleting notification:', notification);
      this.deleteNotification(notification);
    }
  }

  deleteNotification(notification: any): void {
    notification.deleting = true;  // Add a 'deleting' flag to apply the animation
  
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
