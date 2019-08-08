import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  skills: string[] =[]
  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    skill: new FormControl('', [Validators.minLength(4)])
    });

  constructor( private router:Router) { }

  get skill(): FormControl{
    return this.form.get('skill') as FormControl;
  }

  get username(): FormControl{
    return this.form.get('username') as FormControl;
  }
  
  get password(): FormControl{
    return this.form.get('password') as FormControl;
  }

  addSkill(){
      if(this.skill.valid && this.skill.value) {
        this.skills.push(this.skill.value);
        this.skill.reset();
      }
      console.log("aaaaaaaaaaaaaaaa")
  }

  log(obj:any){
      console.log(obj);
  }

  signUp(event){
      console.log(event)
      console.log("bbbbbbbbbbbbb")
    this.router.navigateByUrl('/signin');
  }

}
