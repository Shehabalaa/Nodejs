import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private url:string, private http:HttpClient) { }
  
  getAll(): Observable<any> { return this.http.get(this.url); }
  get(id:string): Observable<any> { return this.http.get(this.url+id);}
  create(data:any): Observable<any> { return this.http.post(this.url,data);}
  delete(id:string, options?:any): Observable<any> { return this.http.delete(this.url + id, options);}
  update(id:string, data:any): Observable<any> { return this.http.put(this.url + id, data);}
  
}
