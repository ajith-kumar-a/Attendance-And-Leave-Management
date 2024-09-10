import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ChartData, ChartOptions,TooltipItem } from 'chart.js';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'] // Note the change here
})

export class StudentsComponent implements OnInit {
  user: any;
  attendance: any[] = [];
  statusMap:  any[] = []; 
  leaveRequest: any = {
    leaveType: '',
    reason: '',
    startDate: '',
    endDate: ''
  };

  // Pie chart data
  public pieChartData: ChartData<'pie'> = {
    labels: ['Present', 'Absent'],
    datasets: [{
      data: [12, 3], // Replace these values with your dynamic data
      backgroundColor: ['#28a745', '#dc3545'],
      borderColor: ['#ffffff', '#ffffff'],
      borderWidth: 1
    }]
  };

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem: any) {
            let label = tooltipItem.label || '';
            const data = tooltipItem.raw as number; // Ensure this is of type number
            const total = 12 + 3; // Replace with the sum of your dataset
            if (label) {
              label += ': ' + data + ' (' + ((data / total) * 100).toFixed(2) + '%)';
            }
            return label;
          }
        }
      }
    }
  };

  constructor(private AuthService: AuthService) {}

  ngOnInit(): void {
    this.fetchStudentDetails()
    this.fetchStatusDetails(); // Fetch status details first
  }

  fetchStudentAttendance(userId: number): void {
    this.AuthService.getUserDetails(`Attendancedetail/by-user/${userId}/`).subscribe(
      (data) => {
        this.attendance = data.data;
      },
      (error) => {
        console.error('Error fetching attendance details', error);
      }
    );
  }

  fetchStudentDetails(){
    this.AuthService.getUserDetails('userme').subscribe(
      (data) => {
        this.user = data.data;
        console.log('Full user object:', this.user);
        this.fetchStudentAttendance(this.user.id);
      },
      (error) => {
        console.error('Error fetching user details', error);
      }
    );
  }

  fetchStatusDetails(): void {
    this.AuthService.getUserDetails('Attendancestatus/').subscribe(
      (data) => {
        this.statusMap = data.data
        console.log("ststus" + data)
      },
      (error) => {
        console.error('Error fetching status details', error);
      }
    );
  }
}
