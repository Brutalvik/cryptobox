import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent implements OnInit {
   //Password View Toggle
  hide = true
  message = ""
  reg = false;
  constructor(private authService : AuthService) {
  }

  ngOnInit(): void {
  }

  //Registration Form
  registerUser = new FormGroup ({
      username: new FormControl("", [Validators.required, Validators.minLength(4)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(7)])
  })

  //Register Function
  register(): void {
    this.reg = true;
    //console.log(this.registerUser.value);
    this.authService.register(this.registerUser.value)
                    .toPromise()
                    .then(msg => { this.message = msg["message"]} )
                    //console.log(this.reg, this.message)

  }


}
