import { Component, input, computed } from '@angular/core';
import { Member } from '../../../shared/models/membet';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-member-card',
  imports: [DatePipe],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css'
})
export class MemberCardComponent {
  member = input.required<Member>();

  age = computed(() => {
    const birthDate = new Date(this.member().dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  });

  timeAgo = computed(() => {
    const lastActive = new Date(this.member().lastActive);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - lastActive.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  });

  genderIcon = computed(() => {
    return this.member().gender.toLowerCase() === 'male' ? 'fas fa-mars' : 'fas fa-venus';
  });

  genderColor = computed(() => {
    return this.member().gender.toLowerCase() === 'male' ? 'text-blue-500' : 'text-pink-500';
  });
}