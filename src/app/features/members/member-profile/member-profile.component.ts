import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../../shared/models/membet';
import { CommonModule, DatePipe, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-member-profile',
  imports: [CommonModule, DatePipe, SlicePipe],
  templateUrl: './member-profile.component.html',
  styleUrl: './member-profile.component.css'
})
export class MemberProfileComponent implements OnInit {
  private route = inject(ActivatedRoute);
  protected member = signal<Member | undefined>(undefined);

  ngOnInit(): void {
    this.route.parent?.data.subscribe({
      next: (data) => {
        this.member.set(data['member']);
      }
    });
  }

  getAge(dateOfBirth: string): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }

  getTimeAgo(lastActive: string): string {
    const now = new Date().getTime();
    const activeTime = new Date(lastActive).getTime();
    const diffInMinutes = Math.floor((now - activeTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} days ago`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) return `${diffInWeeks} weeks ago`;
    
    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths} months ago`;
  }

  getDaysOnPlatform(created: string): number {
    const now = new Date().getTime();
    const createdTime = new Date(created).getTime();
    const diffInDays = Math.floor((now - createdTime) / (1000 * 60 * 60 * 24));
    return diffInDays;
  }

  getActivityStatus(lastActive: string): string {
    const now = new Date().getTime();
    const activeTime = new Date(lastActive).getTime();
    const diffInHours = Math.floor((now - activeTime) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Very Active';
    if (diffInHours < 24) return 'Active';
    if (diffInHours < 168) return 'Moderate'; // 1 week
    if (diffInHours < 720) return 'Inactive'; // 1 month
    return 'Dormant';
  }
}