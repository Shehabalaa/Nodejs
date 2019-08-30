import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
    private _isLoading = false;

    constructor(private postsService: PostsService, private router: Router) { }

    get isLoading() { return this._isLoading; }

    ngOnInit() {
        this._isLoading = true;
        this.postsService.fetchPosts()
            .addListener('fetchEvent', () => {
                this._isLoading = false;
            });
    }


    onDelete(id: string) {
        this._isLoading = true;
        this.postsService.deletePost(id)
            .addListener('deleteEvent', () => {
                this._isLoading = false;
            });
    }

}
