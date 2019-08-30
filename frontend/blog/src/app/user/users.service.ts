import { DataService } from './../services/data.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UsersService extends DataService {
    constructor(http: HttpClient) { super(http, "http://localhost:3000/api/users/"); }

    singup(username: string, password: string) {
        return this.create({ username: username, password: password })
    }

    signin(username: string, password: string) {
        return this.create({ username: username, password: password }, 'signin/')
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
        return localStorage.getItem('token') ? true : false;
    }

    get isAdmin(): boolean {
        return this.isLoggedIn && this.currentUser.admin;
    }
}
