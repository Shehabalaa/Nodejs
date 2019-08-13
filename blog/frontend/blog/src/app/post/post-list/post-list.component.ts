import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Post } from 'src/app/models/post';
import { NotFound } from 'src/common/erros/not-found';
import { AppError } from 'src/common/erros/app-error';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
    private posts: Post[] = [];
    private _isLoading = true;

    constructor(private postsService: PostsService, private router: Router) { }

    get isLoading() { return this._isLoading; }

    ngOnInit() {
        this.posts = [...this.postsService.posts];
        this.postsService.getAll().subscribe((posts: Post[]) => {
            this._isLoading = false;
            this.posts = posts;
            this.postsService.posts = [...this.posts];
        });
    }

    onDelete(id: string) {
        this._isLoading = true;
        this.postsService.delete(id)
            .subscribe(() => {
                this.posts = this.posts.filter(post => post._id !== id);
                this._isLoading = false;
            }, (error: AppError) => {
                if (error instanceof NotFound) {
                    // TODO
                } else {
                    throw error;
                }
            });
    }

}
