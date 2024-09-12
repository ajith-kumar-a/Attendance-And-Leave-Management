import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GlobalNotificationService } from './global-notification.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {
  private notificationSubject = new Subject<string>();
  notification$ = this.notificationSubject.asObservable();

  constructor(private globalNotificationService: GlobalNotificationService) {}

  sendNotification(message: string) {
    this.globalNotificationService.sendNotification(message);
    this.notificationSubject.next(message);
    console.log(`Sending notification: ${message}`); // Debug log
  }



}
