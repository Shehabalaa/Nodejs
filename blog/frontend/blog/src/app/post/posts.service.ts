import { Post } from '../models/post';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { DataService } from "../../common/data.service";

@Injectable({
  providedIn: 'root'
})
export class PostsService extends DataService {
  constructor(http: HttpClient) { super(http, "http://localhost:3000/api/posts/"); }
  posts: Post[] = [];
}
