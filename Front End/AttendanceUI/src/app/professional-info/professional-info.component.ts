import { Component } from '@angular/core';

@Component({
  selector: 'app-professional-info',
  templateUrl: './professional-info.component.html',
  styleUrl: './professional-info.component.css'
})
export class ProfessionalInfoComponent {
  teacher = {
    designation: 'Senior Lecturer',
    department: 'Computer Science',
    subjects: ['Algorithms', 'Data Structures', 'AI'],
    experience: 10,
    qualifications: ['Ph.D. in Computer Science', 'M.Sc. in AI'],
    researchInterests: ['Machine Learning', 'Data Mining'],
    publications: ['Paper 1', 'Paper 2', 'Paper 3']
  };

}
