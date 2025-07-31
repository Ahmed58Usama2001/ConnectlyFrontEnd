import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccounService } from '../../core/services/accoun.service';
import { LoginDto } from '../../shared/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  protected isLoading = signal(false);
  protected showLoginForm = signal(true);

  protected currentUser = computed(() => this.accountService.currentUser());
  protected isLoggedIn = computed(() => !!this.currentUser());

  protected activeTab = signal('matches');


  login() {
    if (!this.loginDto.email || !this.loginDto.password) {
      return;
    }

    this.isLoading.set(true);
    
    this.accountService.login(this.loginDto).subscribe({
      next: (user) => {
        this.isLoading.set(false);
        this.loginDto = { email: '', password: '' };
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.isLoading.set(false);
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