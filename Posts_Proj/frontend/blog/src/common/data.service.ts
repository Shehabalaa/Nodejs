import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { AppError } from './erros/app-error';
import { NotFound } from './erros/not-found';
import { BadInput } from './erros/bad-input';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    constructor(private url: string, private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get(this.url)
            .pipe(catchError(this.handleError));
    }

    create(resource: any): Observable<any> {
        return this.http.post(this.url, resource)
            .pipe(catchError(this.handleError));
    }

    get(id: string): Observable<any> {
        return this.http.get(this.url + id)
            .pipe(catchError(this.handleError));
    }

    delete(id: string, options?: any): Observable<any> {
        return this.http.delete(this.url + id, options)
            .pipe(catchError(this.handleError));
    }

    update(id: string, resource: any): Observable<any> {
        return this.http.put(this.url + id, resource)
            .pipe(catchError(this.handleError));
    }

    private handleError(error: Response) {
        if (error.status === 404) return throwError(new NotFound());
        if (error.status === 400) return throwError(new BadInput(error.json()));
        return throwError(new AppError(error.json()));
    }
}
