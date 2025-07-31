import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AccounService } from '../../core/services/accoun.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private accountService = inject(AccounService);
  private router = inject(Router);

  protected currentUser = computed(() => this.accountService.currentUser());
  protected isLoggedIn = computed(() => !!this.currentUser());

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  navigateToMatches() {
    this.router.navigate(['/matches']);
  }
}