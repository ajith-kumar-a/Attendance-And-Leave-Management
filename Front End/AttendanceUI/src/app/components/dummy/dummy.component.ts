/* app.component.ts */
import { Component,ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
 
// import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  // imports: [CommonModule, RouterOutlet, CanvasJSAngularChartsModule],
  styleUrls: ['./dummy.component.css']
})
export class DummyComponent {
	@ViewChild('contentToConvert', { static: false }) contentToConvert!: ElementRef;

	downloadPDF() {
	  const element = this.contentToConvert.nativeElement;
  
	  html2canvas(element, {
		scale: 2, // Increase quality
		useCORS: true // Ensure cross-origin images are included
	  }).then(canvas => {
		const imgData = canvas.toDataURL('image/png');
		const pdf = new jsPDF('p', 'mm', 'a4');
		const imgWidth = 210; // Width in mm for A4 page
		const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
		pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
		pdf.save('id-card.pdf');
	  }).catch(error => {
		console.error('Error capturing the card:', error);
	  });
	}
}            