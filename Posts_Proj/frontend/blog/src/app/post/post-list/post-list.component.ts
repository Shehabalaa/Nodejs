import { PostsService } from '../posts.service';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  private posts :Post[] = [];
  private _isLoading = true;

  constructor(private postsService:PostsService, private router: Router) { }

  get isLoading(){ return this._isLoading };

  ngOnInit() {
    this.posts = [...this.postsService.posts];
    this.postsService.getAll().subscribe((posts: Post[])=>{
        this._isLoading = false;
        this.posts = posts;
        this.postsService.posts = [...this.posts];
    })
  }
  
  onDelete(id:string){
      this._isLoading = true;
      this.postsService.delete(id, )
      .subscribe((res)=>{
        this.posts = this.posts.filter(post => post._id !== id);
        this._isLoading = false;
      });
  }
 
}
