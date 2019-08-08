import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

class CusAsyncValidators {
    static authenticate(control: FormGroup):Promise<ValidationErrors> {
        console.log("Validation ....")
        return new Promise<ValidationErrors>((resolve, reject)=>{
            setTimeout(() => {
                if(control.get('username').value == 'shehab' && control.get('password').value == 'shehab'){
                    resolve(null);
                }else{
                    resolve({nice:'A7A'});
                }                
            }, 2000);
        })
    }
}



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
    form = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.minLength(3)]),
        password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    },null,CusAsyncValidators.authenticate);

  constructor(private router:Router) { }

  get username(): FormControl{
    return this.form.get('username') as FormControl;
  }
  
  get password(): FormControl{
    return this.form.get('password') as FormControl;
  }
  canSignIn(){
      return this.form.valid && !this.form.pending;
  }

  signIn(){
      console.log(this.form)
      this.router.navigateByUrl('/');
  }

}
