import { Routes } from '@angular/router';
import { RegisterComponent } from './features/account/register/register.component';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', redirectTo: '/home' }
];
