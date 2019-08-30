import { BadInput } from '../common/errors/bad-input';
import { AppError } from '../common/errors/app-error';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { NotFound } from '../common/errors/not-found';

@Injectable()
export class DataService {
    constructor(private http: HttpClient, private baseUrl: string) { }

    getAll(urlExt: string = '') {
        return this.http.get(this.baseUrl + urlExt)
            .pipe(catchError(this.handleError));
    }

    get(id, urlExt: string = '') {
        return this.http.get(this.baseUrl + urlExt + id + '/')
            .pipe(catchError(this.handleError));
    }

    create(resource, urlExt: string = '') {
        return this.http.post(this.baseUrl + urlExt, resource)
            .pipe(catchError(this.handleError));
    }

    update(resource, urlExt: string = '') {
        return this.http.put(this.baseUrl + urlExt + resource._id + '/', resource, { headers: { 'Content-Type': 'application/json' } })
            .pipe(catchError(this.handleError));
    }

    delete(id, urlExt: string = '') {
        return this.http.delete(this.baseUrl + urlExt + id + '/')
            .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 404) return throwError(new NotFound(error));
        if (error.status === 400 || error.status === 401) return throwError(new BadInput(error));
        return throwError(new AppError(error));
    }
}
