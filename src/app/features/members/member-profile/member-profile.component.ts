import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../../shared/models/membet';
import { CommonModule, DatePipe, SlicePipe } from '@angular/common';
import { AgeCalculatorPipe } from '../../../shared/pipes/age-calculator.pipe';
import { TimeAgoPipe } from '../../../shared/pipes/time-ago.pipe';
import { PlatformDaysPipe } from '../../../shared/pipes/platform-days.pipe';
import { ActivityStatusPipe } from '../../../shared/pipes/activity-status.pipe';

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
  protected member = signal<Member | undefined>(undefined);

  ngOnInit(): void {
    this.route.parent?.data.subscribe({
      next: (data) => {
        this.member.set(data['member']);
      }
    });
  }
}