
import { Component } from '@angular/core';
// import { AuthService } from '../../services/auth.service';
// import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  signupUsers: any[] = [];

  signupObj: any = {
    userName: '',
    email: '',
    password: ''
  };

  loginObj: any = {
    userName: '',
    password: ''
  };

  constructor() {}

  ngOnInit(): void {
    const localData = localStorage.getItem('signUpUsers');
    if(localData != null){
      this.signupUsers = JSON.parse(localData)
    }
  }

  onSignUp() {
    this.signupUsers.push(this.signupObj);
    localStorage.setItem('signUpUsers',JSON.stringify(this.signupUsers))
    this.signupObj = {
      userName: '',
      email: '',
      password: ''
    };
  }
  onLogin() {
    const isUserExist = this.signupUsers.find(m => m.userName == this.loginObj.userName && m.password == this.loginObj.password)
    if( isUserExist != undefined){
      alert('user Login Sucessfully')
    }else{
      alert('Wrong Credentails')
    }
    console.log(isUserExist)
  

  }
}

