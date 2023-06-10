import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from "./login/login.component";
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MenuComponent } from './menu/menu.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import {ApartmentService} from "./services/apartment.service";
import {authInterceptorProviders} from "./interceptor/auth.interceptor";
import { ApartmentCardComponent } from './apartment-card/apartment-card.component';
import { ApartmentListComponent } from './apartment-list/apartment-list.component';
import {RouterModule} from "@angular/router";
import { FaqsComponent } from './faqs/faqs.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    MenuComponent,
    AdminPanelComponent,
    ApartmentCardComponent,
    ApartmentListComponent,
    FaqsComponent,
    FeedbackComponent,
    ProfileComponent,
  ],
    imports: [
        BrowserModule,
        HttpClientModule, FormsModule, AppRoutingModule, RouterModule, ReactiveFormsModule
    ],
  providers: [ApartmentService, authInterceptorProviders],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
