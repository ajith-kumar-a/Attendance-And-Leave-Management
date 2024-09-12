// global-notification.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalNotificationService {
  private notificationSubject = new Subject<string>();
  notification$ = this.notificationSubject.asObservable();

  sendNotification(message: string) {
    console.log("now in Global Notification State")
    this.notificationSubject.next(message);
  }
}
