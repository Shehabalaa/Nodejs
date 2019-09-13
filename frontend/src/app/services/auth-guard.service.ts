import { UsersService } from './../user/users.service';
import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(private usersService: UsersService, private router: Router) { }

    canActivate(route, state: RouterStateSnapshot) {
        if (this.usersService.isAdmin) {
            return true;
        }

        this.router.navigate(['/signin'], { queryParams: { returnUrl: state.url } });
        return false;
    }

}
