import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../../shared/models/membet';
import { CommonModule, DatePipe, SlicePipe } from '@angular/common';
import { AgeCalculatorPipe } from '../../../shared/pipes/age-calculator.pipe';
import { TimeAgoPipe } from '../../../shared/pipes/time-ago.pipe';
import { PlatformDaysPipe } from '../../../shared/pipes/platform-days.pipe';
import { ActivityStatusPipe } from '../../../shared/pipes/activity-status.pipe';
import { AccounService } from '../../../core/services/accoun.service';
import { MemberService } from '../../../core/services/member.service';

@Component({
  selector: 'app-member-profile',
  imports: [
    CommonModule, 
    DatePipe, 
    SlicePipe, 
    AgeCalculatorPipe, 
    TimeAgoPipe, 
    PlatformDaysPipe, 
    ActivityStatusPipe
  ],
  templateUrl: './member-profile.component.html',
  styleUrl: './member-profile.component.css'
})
export class MemberProfileComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private accountService = inject(AccounService);
    protected memberService = inject(MemberService);
  protected member = signal<Member | undefined>(undefined);
  
    protected isCurrentUser = computed(() => {
    return this.accountService.currentUser()?.id === this.route.parent?.snapshot.paramMap.get('id')?.toLowerCase();
  });

  ngOnInit(): void {
    this.route.parent?.data.subscribe({
      next: (data) => {
        this.member.set(data['member']);
      }
    });

    console.log(this.accountService.currentUser()?.id 
      + ' === ' + this.route.parent?.snapshot.paramMap.get('id')?.toLowerCase());
    
  }

  onEditProfile(): void {
    // TODO: Implement edit functionality
    console.log('Edit profile clicked!');
  }
}