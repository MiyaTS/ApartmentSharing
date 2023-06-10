import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AdminPanelComponent} from "./admin-panel/admin-panel.component";
import {HomeComponent} from "./home/home.component";
import {ApartmentListComponent} from "./apartment-list/apartment-list.component";
import {FaqsComponent} from "./faqs/faqs.component";
import {FeedbackComponent} from "./feedback/feedback.component";
import {ProfileComponent} from "./profile/profile.component";


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'admin', component: AdminPanelComponent},
  { path: 'apartmentList', component: ApartmentListComponent},
  { path: 'faqs', component: FaqsComponent},
  { path: 'feedback', component: FeedbackComponent},
  { path: 'profile', component: ProfileComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
