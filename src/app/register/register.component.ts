import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent implements OnInit {
  regForm;
  constructor() {
   }

  ngOnInit(): void {}

  hide = true
  errorMessage = 0;
  username
  email
  password
  confirm

  users = [];


 registerUser() {


  const user = {
    username: this.username,
    email: this.email,
    password: this.password
  }

  this.users.push(user);

  console.log(this.users)
 }

 doLogin

}
