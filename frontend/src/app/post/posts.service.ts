import { Post } from '../models/post';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { DataService } from '../services/data.service';
import { EventEmitter } from 'events';
import { AppError } from '../common/errors/app-error';
import { NotFound } from '../common/errors/not-found';

@Injectable({
    providedIn: 'root'
})
export class PostsService extends DataService {
    private _posts: Post[] = [];
    private _post: Post;

    constructor(http: HttpClient) { super(http, "http://localhost:3000/api/posts/"); }

    get posts() { return this._posts; }
    get post() { return this._post; };

    fetchPosts(): EventEmitter {
        const fetchEvent = new EventEmitter();

        this.getAll().subscribe((data: Post[]) => {
            this._posts = data;
            fetchEvent.emit('fetchEvent');
        }, this.errorHandlerFactory());

        return fetchEvent;
    }

    fetchPost(id) {
        const fetchEvent = new EventEmitter();

        this.get(id)
            .subscribe((fetchedPost: Post) => {
                this._post = fetchedPost;
                fetchEvent.emit('fetchEvent');
            }, this.errorHandlerFactory(() => {
                fetchEvent.emit('fetchEvent');
            }));

        return fetchEvent;
    }

    updatePost(title, content) {
        const updateEvent = new EventEmitter();

        this.update({ _id: this._post._id, title: title, content: content })
            .subscribe(() => {
                updateEvent.emit('updateEvent');
            }, this.errorHandlerFactory(() => {
                updateEvent.emit('updateEvent');
            }));

        return updateEvent;
    }

    createPost(title, content) {
        const createEvent = new EventEmitter();

        this.create({ title: title, content: content })
            .subscribe(() => {
                createEvent.emit('createEvent');
            }, this.errorHandlerFactory(() => {
                createEvent.emit('createEvent');
            }))

        return createEvent;
    }

    deletePost(id) {
        const postIndx = this._posts.findIndex(post => post._id == id);
        const tmpCpy = [...this._posts];
        this._posts.splice(postIndx, 1);
        const deleteEvent = new EventEmitter();

        this.delete(id)
            .subscribe(() => {
                deleteEvent.emit('deleteEvent');
            }, this.errorHandlerFactory(() => {
                this._posts = tmpCpy;
                deleteEvent.emit('deleteEvent');
            }));

        return deleteEvent;
    }

    private errorHandlerFactory(handler = () => { }) {
        return (error: AppError) => {
            handler();
            if (error.objType == NotFound.classType) {
                // TODO
            } else {
                throw error;
            }
        }

    }



}
