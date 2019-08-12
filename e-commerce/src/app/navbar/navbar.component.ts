import { UsersService } from './../services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    constructor(public usersService: UsersService) { }

    ngOnInit() {
    }

}
