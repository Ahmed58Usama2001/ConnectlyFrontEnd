import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccounService } from '../../core/services/accoun.service';
import { LoginDto } from '../../shared/models/user';
import { Router, RouterModule } from '@angular/router';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  private accountService = inject(AccounService);
  private router = inject(Router);
  private toast = inject(ToastService)

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
      next: () => {
        this.isLoading.set(false);
        this.loginDto = { email: '', password: '' };
        this.router.navigate(['/home']);
        this.toast.Success('Logged in successfully!');
      },
      error: (error) => {
        this.isLoading.set(false);

        if (error.error?.errors) {
          // Multiple validation errors (ASP.NET style)
          for (const field in error.error.errors) {
            if (error.error.errors.hasOwnProperty(field)) {
              const messages: string[] = error.error.errors[field];
              messages.forEach(msg => this.toast.Error(msg)); // show each error as toast
            }
          }
        } else if (error.error?.title) {
          // General error
          this.toast.Error(error.error.title);
        } else {
          // Fallback
          this.toast.Error("Something went wrong. Please try again.");
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

  navigateToHome(){
    this.router.navigate(['/home']);
  }

  editProfile() {
    console.log('Edit profile clicked');
  }

  setActiveTab(tab: string) {
    this.activeTab.set(tab);
  }
}