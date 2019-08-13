import { BadInput } from '../common/error-handling/bad-input';
import { NotFoundError } from '../common/error-handling/not-found-error';
import { AppError } from '../common/error-handling/app-error';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class DataService {
  constructor(private url: string, private http: HttpClient) { }

  getAll() {
    return this.http.get(this.url)
      .pipe(map((response: Response) => response.json()))
      .pipe(catchError(this.handleError));
  }

  get(id) {
    return this.http.get(this.url + '/' + id)
      .pipe(map((response: Response) => response.json()))
      .pipe(catchError(this.handleError));
  }

  create(resource) {
    return this.http.post(this.url, JSON.stringify(resource))
      .pipe(map((response: Response) => response.json()))
      .pipe(catchError(this.handleError));
  }

  update(resource) {
    return this.http.patch(this.url + '/' + resource.id, JSON.stringify({ isRead: true }))
      .pipe(map((response: Response) => response.json()))
      .pipe(catchError(this.handleError));
  }

  delete(id) {
    return this.http.delete(this.url + '/' + id)
      .pipe(map((response: Response) => response.json()))
      .pipe(catchError(this.handleError));
  }

  private handleError(error: Response) {
    if (error.status === 400 || error.status === 401) {
      return throwError(new BadInput(error.json()));
    }
    if (error.status === 404) {
      return throwError(new NotFoundError());
    }

    return throwError(new AppError(error));
  }
}
