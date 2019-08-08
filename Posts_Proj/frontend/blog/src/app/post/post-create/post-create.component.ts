import { Observable } from 'rxjs';
import { PostsService } from '../posts.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Post } from '../../models/post';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
    
    constructor(private postsService: PostsService, private activatedRoute: ActivatedRoute, private router: Router) { }
    
    private _isLoading = false;
    private _mode = "create"
    private post: Post = { _id: "", title: "", content: "" };
    form = new FormGroup({
        title: new FormControl('', [Validators.required, Validators.minLength(3)]),
        content: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
    
    get isLoading() { return this._isLoading; }
    get mode() { return this._mode; }
    get title() { return this.form.get('title'); }
    get content() { return this.form.get('content'); }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has("postId")) {
                this._mode = "edit";
                this._isLoading = true;        
                this.postsService.get(paramMap.get("postId"))
                    .subscribe((post:Post) => {
                        this.post = post;
                        this.title.setValue(post.title);
                        this.content.setValue(post.content);
                        this._isLoading = false;
                    })
            } else {
                this._mode = "create";
            }
        });

    }

    onSavePost() {
        let observ: Observable<any>;
        if (this._mode == "create") {
            observ = this.postsService.create({title:this.title.value, content:this.content.value});
        } else {
            observ = this.postsService.update(this.post._id, {title:this.title.value, content:this.content.value});
        }
        this._isLoading = true;
        observ.subscribe(()=>{
            this._isLoading = false;
            this.router.navigateByUrl('/')
        });
        
    }

}
