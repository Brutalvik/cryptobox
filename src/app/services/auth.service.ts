import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from '../models/User'

import { BehaviorSubject, Observable } from 'rxjs';
import { first, catchError, tap} from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


   private url = "http://localhost:3000/auth";

  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  userID: Pick<User, "id">

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type" : "application/json" })
  }

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
    ) { }

    userLoggedIn(){
      return !!localStorage.getItem('token')
    }

    logout() {
      return localStorage.removeItem('token')
    }

  register(user: Omit<User, "id">): Observable<User> {
      return this.http
        .post<User>(`${this.url}/register`, user, this.httpOptions)
        .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<User>("register"))
      )
  }

  login(email: Pick<User, "email">, password: Pick<User, "password">): Observable<{
    token: string;
    userID:  Pick<User, "id">
  }> {
    return this.http
      .post(`${this.url}/login`, { email, password }, this.httpOptions)
      .pipe(
      first(),
      tap((tokenObject: {
        token: string;
        userID:  Pick<User, "id">
      }) => {
        this.userID = tokenObject.userID;
        localStorage.setItem("token", tokenObject.token);
        this.isLoggedIn$.next(true);
        this.router.navigate(["home"]);
      }),
      catchError(this.errorHandlerService.handleError<{
        token: string;
        userID:  Pick<User, "id">
      }>("login"))
    )
}
}
