import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
  }
  //Password View Toggle
  hide = true;
  errorMessage = ""
  errorStatus = false;
  error: any;
  //Login Form
  loginUser = new FormGroup ({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(7)])
})

errorCheck(){
  if (localStorage.getItem("infiniteScrollEnabled") === null)
  {
    this.errorStatus = true;
    this.errorMessage = "Invalid Login Details"
  }
}

 //Login Function
doLogin(): void{
  this.authService.login(this.loginUser.value.email, this.loginUser.value.password).subscribe()
  this.errorCheck();
}

}
