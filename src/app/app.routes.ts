import { Routes } from '@angular/router';
import { RegisterComponent } from './features/account/register/register.component';
import { HomeComponent } from './features/home/home.component';
import { MemberListComponent } from './features/members/member-list/member-list.component';
import { MemberDetailedComponent } from './features/members/member-detailed/member-detailed.component';
import { ListsComponent } from './features/lists/lists.component';
import { MessagesComponent } from './features/messages/messages.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'members', component: MemberListComponent },
    { path: 'members/:id', component: MemberDetailedComponent },
    { path: 'lists', component: ListsComponent },
    { path: 'messages', component: MessagesComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', redirectTo: '/home' }
];
