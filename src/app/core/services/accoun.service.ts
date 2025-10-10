import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { User, RegisterDto, LoginDto } from '../../shared/models/user';
import { LikesService } from './likes.service';

@Injectable({
  providedIn: 'root'
})
export class AccounService {
  private baseUrl = environment.apiUrl + 'account/';
  private http = inject(HttpClient);
  private router = inject(Router);
  private likesService = inject(LikesService);

  private userSignal = signal<User | null>(this.getUserFromLocalStorage());

  readonly currentUser = computed(() => this.userSignal());

  register(registerDto: RegisterDto) {
    return this.http.post<User>(this.baseUrl + 'register', registerDto).pipe(
      tap(user => this.setUser(user))
    );
  }

  login(loginDto: LoginDto) {
    return this.http.post<User>(this.baseUrl + 'login', loginDto).pipe(
      tap(user => this.setUser(user))
    );
  }

  logout() {
    return this.http.post(this.baseUrl + 'logout', {}).pipe(
      tap(() => {
        localStorage.removeItem('user');
        this.likesService.clearLikeIds();
        this.setUser(null);
        this.router.navigate(['/home']);
      })
    );
  }

  getCurrentUser() {
    return this.http.get<User>(this.baseUrl + 'get-current-user').pipe(
      tap(user => this.setUser(user))
    );
  }

  private getUserFromLocalStorage(): User | null {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }

  setUser(user: User | null) {
    user!.roles = user ? this.getRolesFromToken(user) : [];
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
    this.userSignal.set(user);
    this.likesService.getLikeIds();
  }

  private getRolesFromToken(user: User): string[] {
    const payload = user.token.split('.')[1];
    const decodedPayload = atob(payload);
    const tokenData = JSON.parse(decodedPayload);
    return Array.isArray(tokenData.role) ? tokenData.role : [tokenData.role];
  }
}