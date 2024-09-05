import { Component } from '@angular/core';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.css'
})
export class PersonalInfoComponent {
  teacher = {
    name: 'John Doe',
    id: 'T1234',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    gender: 'Male',
    dob: '1985-05-15'
  };

}
