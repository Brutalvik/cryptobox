import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  hide = true;

  username = ""
  password = ""
  errTxt = ""

  name = 'putri'

  fadeOut() {
    setTimeout( () => {
          this.errTxt = "";
        }, 6000);
      }

  doLogin() {
    //validation
    if (this.username === "" && this.password === "")
      {
        this.errTxt = "* Required"
      }
    else if (this.username === "")
      {
        this.errTxt = "Username cannot be blank"

      }
    else if (this.password === "")
      {
        this.errTxt = "Password cannot be blank"
      }
    else
      {
          this.router.navigateByUrl('/home')
      }
  }
}
