// global-notification.component.ts
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalNotificationService } from '../../services/global-notification.service';

@Component({
  selector: 'app-global-notification',
  template: '',
  styleUrls: ['./global-notification.component.css']
})
export class GlobalNotificationComponent implements OnInit {

  constructor(
    private globalNotificationService: GlobalNotificationService,
    private snackBar: MatSnackBar
  ) {}

// global-notification.component.ts
ngOnInit(): void {
  this.globalNotificationService.notification$.subscribe(
    message => {
      console.log(`Received notification: ${message}`); 
      this.openSnackBar(message);
    },
    error => {
      console.error('Notification subscription error:', error);
    }
  );
  this.openSnackBar("Welcome to GAP")
}


openSnackBar(message: string) {
  this.snackBar.open(message, 'Close', {
    duration: 1000, 
    verticalPosition: 'top',
    horizontalPosition: 'center',
    panelClass: ['custom-snackbar']
  });
}



//   // global-notification.component.ts
// ngOnInit(): void {
//   this.globalNotificationService.notification$.subscribe(
//     message => {
//       console.log(`Received notification: ${message}`); // Debug log
//       this.openSnackBar(message);
//     },
//     error => {
//       console.error('Notification subscription error:', error);
//     }
//   );
// }



}
