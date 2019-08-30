import { BadInput } from './../../common/errors/bad-input';
import { AppError } from './../../common/errors/app-error';
import { UsersService } from './../users.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
    private skills: string[] = [];
    isLoading = false;
    form;

    constructor(private usersService: UsersService, private router: Router) {
        this.form = new FormGroup({
            username: new FormControl('', [Validators.required, Validators.minLength(3)]),
            password: new FormControl('', [Validators.required, Validators.minLength(4)]),
            skill: new FormControl('', [Validators.minLength(4)])
        });

    }

    get skill(): FormControl { return this.form.get('skill') as FormControl; }
    get username(): FormControl { return this.form.get('username') as FormControl; }
    get password(): FormControl { return this.form.get('password') as FormControl; }

    addSkill() {
        if (this.skill.valid && this.skill.value) {
            this.skills.push(this.skill.value);
            this.skill.reset();
        }
    }

    signup() {
        const errorHandler = (err: AppError) => {
            console.log(err)
            this.isLoading = false;
            if (err.objType === BadInput.classType) {
                this.form.setErrors(err);
            } else {
                throw err;
            }
        }

        if (this.isLoading === false) {
            this.isLoading = true;
            this.usersService.singup(this.username.value, this.password.value)
                .subscribe(() => {
                    this.usersService.signin(this.username.value, this.password.value)
                        .subscribe(() => {
                            this.isLoading = false;
                            this.router.navigate(['/']);
                        }, errorHandler)
                }, errorHandler);
        }
    }

}