import { BadInput } from '../../common/errors/bad-input';
import { AppError } from '../../common/errors/app-error';
import { UsersService } from '../users.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
    form: FormGroup;
    isLoading: boolean;

    constructor(private router: Router, private usersService: UsersService, private actvRoute: ActivatedRoute) {
        this.form = new FormGroup({
            username: new FormControl('', [Validators.required, Validators.minLength(3)]),
            password: new FormControl('', [Validators.required, Validators.minLength(4)]),
        });

        this.isLoading = false;
    }

    get username(): FormControl { return this.form.get('username') as FormControl; }
    get password(): FormControl { return this.form.get('password') as FormControl; }

    signin() {
        if (this.isLoading === false) {
            this.isLoading = true;
            this.usersService.signin(this.username.value, this.password.value)
                .subscribe(() => {
                    this.isLoading = false;
                    this.actvRoute.queryParamMap.subscribe((paramMap: ParamMap) => {
                        const route = paramMap.get('returnUrl') || '/';
                        this.router.navigate([route]);
                    });
                }, (err: AppError) => {
                    this.isLoading = false;

                    if (err.objType == BadInput.classType) {
                        this.form.setErrors(err.originalError);
                    } else {
                        throw err;
                    }
                });
        }
    }

}



// class CusAsyncValidators {
//     static authenticate(control: FormGroup):Promise<ValidationErrors> {
//         console.log("Validation ....")
//         return new Promise<ValidationErrors>((resolve, reject)=>{
//             setTimeout(() => {
//                 if(control.get('username').value == 'shehab' && control.get('password').value == 'shehab'){
//                     resolve(null);
//                 }else{
//                     resolve({nice:'A7A'});
//                 }
//             }, 2000);
//         })
//     }
// }

