import { AuthGuardService } from './services/auth-guard.service';
import { OrdersComponent } from './orders/orders.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, } from '@angular/router';
import { NgModule } from '@angular/core';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routes = [
    { path: '', component: HomeComponent },
    { path: 'signup', component: SignUpComponent },
    { path: 'signin', component: SignInComponent },
    { path: 'orders', component: OrdersComponent, canActivate: [AuthGuardService] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
