import { Component } from '@angular/core';

@Component({
  selector: 'app-attendance-summary',
  templateUrl: './attendance-summary.component.html',
  styleUrl: './attendance-summary.component.css'
})
export class AttendanceSummaryComponent {
  selectedPeriod = 'Daily';

  generateAbsenteeReport() {
    console.log('Generating absentee report for', this.selectedPeriod);
  }

}
