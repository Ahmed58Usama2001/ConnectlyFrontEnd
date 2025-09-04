import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { User, RegisterDto, LoginDto } from '../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AccounService {
  private baseUrl = environment.apiUrl + 'account/';
  private http = inject(HttpClient);
  private router = inject(Router);

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
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
    this.userSignal.set(user);
  }
}