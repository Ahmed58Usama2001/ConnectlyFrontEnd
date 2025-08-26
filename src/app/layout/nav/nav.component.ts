import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccounService } from '../../core/services/accoun.service';
import { LoginDto } from '../../shared/models/user';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent  {
  private accountService = inject(AccounService);
  private router = inject(Router);

  protected loginDto: LoginDto = {
    email: '',
    password: ''
  };

  errors: { email?: string; password?: string; general?: string } = {};


  protected isLoading = signal(false);
  protected showLoginForm = signal(true);

  protected currentUser = computed(() => this.accountService.currentUser());
  protected isLoggedIn = computed(() => !!this.currentUser());

  protected activeTab = signal('matches');

login() {
  if (!this.loginDto.email || !this.loginDto.password) {
    this.errors = {
      email: !this.loginDto.email ? 'Email is required' : undefined,
      password: !this.loginDto.password ? 'Password is required' : undefined
    };
    return;
  }

  this.isLoading.set(true);
  this.errors = {}; // clear old errors

  this.accountService.login(this.loginDto).subscribe({
    next: (user) => {
      this.isLoading.set(false);
      this.loginDto = { email: '', password: '' };
      this.router.navigate(['/home']);
    },
    error: (error) => {
      this.isLoading.set(false);

      if (error.status === 401) {
        this.errors.general = 'Invalid email or password.';
      } else if (error.error?.errors) {
        this.errors = {
          email: error.error.errors.Email?.[0],
          password: error.error.errors.Password?.[0],
          general: error.error.message
        };
      } else {
        this.errors.general = 'Something went wrong. Please try again.';
      }
    }
  });
}


  logout() {
    this.isLoading.set(true);
    
    this.accountService.logout().subscribe({
      next: () => {

        this.isLoading.set(false);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.isLoading.set(false);
      }
    });
  }

  editProfile() {
    console.log('Edit profile clicked');
  }

  setActiveTab(tab: string) {
    this.activeTab.set(tab);
  }
}