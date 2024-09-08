import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent {
  roleObj : any= {
    role_name : ''
  }

  constructor(private accService: AuthService,private route:Router) {}



  addRole() {
    this.accService.addRecord('rolere/',this.roleObj).subscribe(()=>{
      this.roleObj = {
        role_name: '',
      };
      window.alert("Record Added Sucessfully");
    })
  }

}
