import { UsersService } from './../services/users.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
    orders = []
    constructor(private http: HttpClient, private usersService: UsersService) { }

    ngOnInit() {
        this.http.get('/users/orders', { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })
            .subscribe((orders: any) => {
                this.orders = orders;
            });
    }

}