import { Component, computed, inject, OnInit, signal, effect } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Member } from '../../../shared/models/membet';
import { Location } from '@angular/common';
import { AccounService } from '../../../core/services/accoun.service';
import { AgeCalculatorPipe } from '../../../shared/pipes/age-calculator.pipe';
import { MemberService } from '../../../core/services/member.service';

@Component({
  selector: 'app-member-detailed',
  imports: [ RouterLink, RouterLinkActive, RouterOutlet, AgeCalculatorPipe],
  templateUrl: './member-detailed.component.html',
  styleUrl: './member-detailed.component.css'
})
export class MemberDetailedComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private accountService = inject(AccounService);
  private location = inject(Location);
  
  protected isCurreentUser = computed(() => {
    return this.accountService.currentUser()?.id === this.route.snapshot.paramMap.get('id');
  });

  protected member = signal<Member | undefined>(undefined);


  ngOnInit(): void {
    this.route.data.subscribe({
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

  likeUser(): void {
    // TODO: Implement like functionality
    console.log('User liked!');
    // You can call your member service to like the user
    // this.memberService.likeUser(memberId).subscribe(...);
  }

  goBack(): void {
    this.location.back();
  }
}