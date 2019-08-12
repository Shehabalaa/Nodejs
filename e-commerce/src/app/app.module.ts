import { fakeBackendProvider } from './common/fake-backend';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { OrdersComponent } from './orders/orders.component';
import { InputFormatDirective } from './directives/input-format/input-format.directive';
import { TitleCasePipe } from './pipes/title-case.pipe';
import { SummaryPipe } from './pipes/summary.pipe';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppErrorHandler } from './common/app-error-handler';
import { NgModule, ErrorHandler } from '@angular/core';

import { DataService } from './services/data.service';
import { UsersService } from './services/users.service';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NavbarComponent,
        SignUpComponent,
        SignInComponent,
        InputFormatDirective,
        SummaryPipe,
        TitleCasePipe,
        OrdersComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule
    ],
    providers: [
        DataService,
        UsersService,
        fakeBackendProvider,
        { provide: ErrorHandler, useClass: AppErrorHandler }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
