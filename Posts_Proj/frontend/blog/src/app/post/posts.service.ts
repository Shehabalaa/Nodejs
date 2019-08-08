import { Post } from '../models/post';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { DataService } from "../../common/data.service" ;
import { Subject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class PostsService extends DataService{
    constructor(http: HttpClient) { super("http://localhost:3000/api/posts/", http); }
    posts :Post[] = [];
}
