import { Component, computed, HostListener, inject, OnDestroy, OnInit, signal, ViewChild, viewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditableMember, Member } from '../../../shared/models/membet';
import { CommonModule, DatePipe, SlicePipe } from '@angular/common';
import { AgeCalculatorPipe } from '../../../shared/pipes/age-calculator.pipe';
import { TimeAgoPipe } from '../../../shared/pipes/time-ago.pipe';
import { PlatformDaysPipe } from '../../../shared/pipes/platform-days.pipe';
import { ActivityStatusPipe } from '../../../shared/pipes/activity-status.pipe';
import { AccounService } from '../../../core/services/accoun.service';
import { MemberService } from '../../../core/services/member.service';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-member-profile',
  imports: [
    CommonModule,
    DatePipe,
    SlicePipe,
    AgeCalculatorPipe,
    TimeAgoPipe,
    PlatformDaysPipe,
    ActivityStatusPipe,
    FormsModule
  ],
  templateUrl: './member-profile.component.html',
  styleUrl: './member-profile.component.css'
})
export class MemberProfileComponent implements OnInit, OnDestroy {
  @ViewChild('editForm') editForm?: NgForm;
  @HostListener('window:beforeunload', ['$event']) notify($event: BeforeUnloadEvent) {
    if (this.editForm?.dirty)
      $event.preventDefault();
  }
  private route = inject(ActivatedRoute);
  private accountService = inject(AccounService);
  private toast = inject(ToastService)
  protected memberService = inject(MemberService);
  protected member = signal<Member | undefined>(undefined);
  protected editableMember: EditableMember = {
    userName: '',
    description: '',
    city: '',
    country: ''
  };

  protected isCurrentUser = computed(() => {
    return this.accountService.currentUser()?.id === this.route.parent?.snapshot.paramMap.get('id')?.toLowerCase();
  });

  ngOnInit(): void {
    this.route.parent?.data.subscribe({
      next: (data) => {
        this.member.set(data['member']);
      }
    });

    this.editableMember = {
      userName: this.member()?.userName || '',
      description: this.member()?.description || '',
      city: this.member()?.city || '',
      country: this.member()?.country || ''
    };
  }

  ngOnDestroy(): void {
    this.memberService.editMode.set(false);
  }


  updateProfile() {
    if (!this.member()) return;
    const updatedMember = {
      ...this.member(), ...this.editableMember
    };
    this.memberService.updateMember(this.editableMember).subscribe({
      next: () => {
        this.toast.Success('Profile updated successfully');
        this.memberService.editMode.set(false);
        this.editForm?.reset(updatedMember);
      }
    })
  }




  onEditProfile(): void {
    // TODO: Implement edit functionality
    console.log('Edit profile clicked!');
  }
}