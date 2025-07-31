import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AccounService } from '../../../core/services/accoun.service';
import { RegisterDto } from '../../../shared/models/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private accountService = inject(AccounService);
  private router = inject(Router);

  // Convert registerDto to signals for better reactivity
  protected email = signal('');
  protected userName = signal('');
  protected password = signal('');

  protected isLoading = signal(false);
  protected showPassword = signal(false);

  // Computed property for registerDto to maintain compatibility
  protected registerDto = computed((): RegisterDto => ({
    email: this.email(),
    userName: this.userName(),
    password: this.password()
  }));

  // Email validation
  protected emailValidation = computed(() => {
    const emailValue = this.email();
    return {
      isValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue),
      hasValue: emailValue.length > 0
    };
  });

  // Username validation
  protected usernameValidation = computed(() => {
    const usernameValue = this.userName();
    return {
      minLength: usernameValue.length >= 3,
      maxLength: usernameValue.length <= 20,
      hasValue: usernameValue.length > 0
    };
  });

  // Password validation signals
  protected passwordValidation = computed(() => {
    const passwordValue = this.password();
    return {
      minLength: passwordValue.length >= 6,
      hasUppercase: /[A-Z]/.test(passwordValue),
      hasLowercase: /[a-z]/.test(passwordValue),
      hasSpecialChar: /[^a-zA-Z0-9]/.test(passwordValue),
      hasUniqueChars: new Set(passwordValue).size >= 2
    };
  });

  protected isPasswordValid = computed(() => {
    const validation = this.passwordValidation();
    return validation.minLength && 
           validation.hasUppercase && 
           validation.hasLowercase && 
           validation.hasSpecialChar && 
           validation.hasUniqueChars;
  });

  protected isFormValid = computed(() => {
    const emailValid = this.emailValidation().isValid;
    const usernameValid = this.usernameValidation().minLength && this.usernameValidation().maxLength;
    const passwordValid = this.isPasswordValid();
    
    return emailValid && usernameValid && passwordValid;
  });

  // Update methods for form inputs
  updateEmail(value: string) {
    this.email.set(value);
  }

  updateUserName(value: string) {
    this.userName.set(value);
  }

  updatePassword(value: string) {
    this.password.set(value);
  }

  register() {
    if (!this.isFormValid()) {
      return;
    }

    this.isLoading.set(true);
    
    this.accountService.register(this.registerDto()).subscribe({
      next: (user) => {
        this.isLoading.set(false);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Registration failed:', error);
        this.isLoading.set(false);
      }
    });
  }

  cancel() {
    this.router.navigate(['/home']);
  }

  togglePasswordVisibility() {
    this.showPassword.set(!this.showPassword());
  }
}