import { Observable } from 'rxjs';
import { PostsService } from '../posts.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
    private _isLoading = false;
    private _mode = "create"
    private form: FormGroup;

    constructor(private postsService: PostsService, private activatedRoute: ActivatedRoute, private router: Router) {
        this.form = new FormGroup({
            title: new FormControl('', [Validators.required, Validators.minLength(3)]),
            content: new FormControl('', [Validators.required, Validators.minLength(3)])
        });
    }

    get isLoading() { return this._isLoading; }
    get mode() { return this._mode; }
    get title() { return this.form.get('title'); }
    get content() { return this.form.get('content'); }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has("postId")) {
                this._isLoading = true;
                this._mode = "edit";
                this.postsService.fetchPost(paramMap.get("postId"))
                    .addListener('fetchEvent', () => {
                        this.title.setValue(this.postsService.post.title);
                        this.content.setValue(this.postsService.post.content);
                        this._isLoading = false;
                    });
            } else {
                this._mode = "create";
            }
        });
    }

    onSavePost() {
        this._isLoading = true;
        if (this._mode == "create") {
            this.postsService.createPost(this.title.value, this.content.value)
                .addListener('createEvent', () => { this._isLoading = false; this.router.navigate(['/posts']); });
        } else {
            this.postsService.updatePost(this.title.value, this.content.value)
                .addListener('updateEvent', () => { this._isLoading = false; this.router.navigate(['/posts']); });
        }

    }

}
