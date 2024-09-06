import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Corrected here
})
export class LoginComponent implements OnInit {

  signupUsers: any[] = [];
  signupObj: any = {
    first_name : '',
    last_name:'',
    userName: '',
    email: '',
    password: '',
    password2:''
  };
  loginObj: any = {
    username: '',
    password: ''
  };

  constructor(private accService: AuthService,private route:Router) {}

  ngOnInit(): void {
    const localData = localStorage.getItem('signUpUsers');
    if (localData != null) {
      this.signupUsers = JSON.parse(localData);
    }

  }

  onSignUp() {
    this.signupUsers.push(this.signupObj);
    this.accService.addRecord('userregister',this.signupObj).subscribe(()=>{
      this.signupObj = {
        userName: '',
        email: '',
        password: ''
      };
      window.alert("Record Added Sucessfully");
    })
    localStorage.setItem('signUpUsers', JSON.stringify(this.signupUsers));
    this.signupObj = {
      userName: '',
      email: '',
      password: ''
    };
  }

  onLogin() {
    this.accService.onLogin(this.loginObj).subscribe({
      next: (res: any) => {
        console.log('res', res);
        localStorage.setItem('access', res.access);
        this.route.navigateByUrl('/students');
      },
      error: (err) => {
        console.error('Login error', err);
      }
    });
  }
}
