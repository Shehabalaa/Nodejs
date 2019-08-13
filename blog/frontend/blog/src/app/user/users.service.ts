import { DataService } from './../../common/data.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppError } from '../common/error-handling/app-error';
import { BadInput } from '../common/error-handling/bad-input';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends DataService {
  constructor(http: HttpClient) { super(http, "http://localhost:3000/api/users/"); }

  singup(username: string, password: string) {
    return this.create({ username: username, password: password })
  }

  signin(username: string, password: string) {
    return this.http.post('/api/users', { username, password, admin: true })
      .pipe(catchError((error) => {
        if (error.status === 401) { return throwError(new BadInput(error)); }
        return throwError(new AppError());
      }))
      .pipe(map((res: any) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
        }
      }));
  }

  signout() {
    localStorage.removeItem('token');
  }

  get currentUser() {
    const token = localStorage.getItem('token');
    if (!token) { return null; }

    return new JwtHelperService().decodeToken(token);
  }

  get isLoggedIn(): boolean {
    return false;
    return localStorage.getItem('token') ? true : false;
  }

  get isAdmin(): boolean {
    return this.isLoggedIn && this.currentUser.admin;
  }
}
