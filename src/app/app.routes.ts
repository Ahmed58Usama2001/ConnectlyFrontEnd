import { Routes } from '@angular/router';
import { RegisterComponent } from './features/account/register/register.component';
import { HomeComponent } from './features/home/home.component';
import { MemberListComponent } from './features/members/member-list/member-list.component';
import { MemberDetailedComponent } from './features/members/member-detailed/member-detailed.component';
import { ListsComponent } from './features/lists/lists.component';
import { MessagesComponent } from './features/messages/messages.component';
import { authGuard } from './core/guards/auth.guard';
import { registerationGuard } from './core/guards/registeration.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'members', component: MemberListComponent, canActivate: [authGuard] },
    { path: 'members/:id', component: MemberDetailedComponent, canActivate: [authGuard] },
    { path: 'lists', component: ListsComponent, canActivate: [authGuard] },
    { path: 'messages', component: MessagesComponent, canActivate: [authGuard] },
    { path: 'register', component: RegisterComponent,canActivate: [registerationGuard] },
    { path: '**', redirectTo: '/home' }
];
