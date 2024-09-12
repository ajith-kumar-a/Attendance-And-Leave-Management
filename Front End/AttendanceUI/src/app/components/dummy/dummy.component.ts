/* app.component.ts */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

// import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  // imports: [CommonModule, RouterOutlet, CanvasJSAngularChartsModule],
  styleUrls: ['./dummy.component.css']
})
export class DummyComponent {

	constructor(private snackBar: MatSnackBar) { }

	openSnackBar() {
	  this.snackBar.open('Hello World!', 'Close', {
		duration: 2000, // Duration in milliseconds
	  });
	}
}            