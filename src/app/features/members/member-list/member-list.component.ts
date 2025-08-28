import { Component, inject } from '@angular/core';
import { MemberService } from '../../../core/services/member.service';
import { Observable } from 'rxjs';
import { Member } from '../../../shared/models/membet';
import { AsyncPipe } from '@angular/common';
import { MemberCardComponent } from '../member-card/member-card.component';

@Component({
  selector: 'app-member-list',
  imports: [AsyncPipe, MemberCardComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent {
  private memberService = inject(MemberService);
  protected members$: Observable<Member[]>;

  constructor() {
    this.members$ = this.memberService.getMembers();
  }
}