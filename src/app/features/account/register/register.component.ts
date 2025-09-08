import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AccounService } from '../../../core/services/accoun.service';
import { RegisterDto } from '../../../shared/models/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private accountService = inject(AccounService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  protected isLoading = signal(false);
  protected showPassword = signal(false);

  // Reactive Form
  registerForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          this.passwordValidator
        ]
      ],
      confirmPassword: ['', Validators.required]
    },
    { validators: this.matchPasswords }
  );

  // Custom validator for password requirements
  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';
    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasSpecialChar = /[^a-zA-Z0-9]/.test(value);
    const hasUniqueChars = new Set(value).size >= 2;
    return hasUppercase && hasLowercase && hasSpecialChar && hasUniqueChars ? null : { weakPassword: true };
  }

  // Validator for confirm password
  matchPasswords(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Password requirements for UI
  passwordRequirements = [
    { label: 'One uppercase letter', check: (val: string) => /[A-Z]/.test(val) },
    { label: 'One lowercase letter', check: (val: string) => /[a-z]/.test(val) },
    { label: 'One special character', check: (val: string) => /[^a-zA-Z0-9]/.test(val) },
    { label: 'At least 2 unique characters', check: (val: string) => new Set(val).size >= 2 }
  ];

  // Getters for easy template access
  get email() { return this.registerForm.get('email'); }
  get userName() { return this.registerForm.get('userName'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);

    const dto: RegisterDto = {
      email: this.email?.value!,
      userName: this.userName?.value!,
      password: this.password?.value!,
      confirmPassword: this.confirmPassword?.value!
    };

    this.accountService.register(dto).subscribe({
      next: () => {
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
