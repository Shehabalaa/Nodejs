import { JwtHelperService } from '@auth0/angular-jwt';
import { AppError } from '../common/app-error';
import { BadInput } from '../common/bad-input';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    constructor(private http: HttpClient) { }

    singup(username: string, password: string) {
        return this.http.post("/users/signup", { username: username, password: password })
            .pipe(catchError((error: HttpResponse<string>) => {
                console.log(error.status);
                if (error.status == 401) return throwError(new BadInput());
                return throwError(new AppError());
            }));
    }

    login(username: string, password: string) {
        return this.http.post("/users/authenticate", { username: username, password: password, admin: true })
            .pipe(catchError((error) => {
                if (error.status == 401) return throwError(new BadInput(error));
                return throwError(new AppError());
            }))
            .pipe(map((res) => {
                if (res['token'])
                    localStorage.setItem('token', res['token']);
            }));
    }

    logout() {
        localStorage.removeItem('token');
    }

    get currentUser() {
        let token = localStorage.getItem('token')
        if (!token) return null;

        return new JwtHelperService().decodeToken(token);
    }

    get isLoggedIn(): boolean {
        return localStorage.getItem('token') ? true : false;
    }

    get isAdmin(): boolean {
        return this.isLoggedIn && this.currentUser.admin;
    }
}
