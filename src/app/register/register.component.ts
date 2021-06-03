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
  hide = true

  constructor(private authService : AuthService) {
  }

  ngOnInit(): void {
  }


  registerUser = new FormGroup ({
      username: new FormControl("", [Validators.required, Validators.minLength(4)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(7)])
  })

  register(): void {
    //console.log(this.registerUser.value);
    this.authService.register(this.registerUser.value)
                    .subscribe(
                      (msg) => console.log(msg))
  }



}
