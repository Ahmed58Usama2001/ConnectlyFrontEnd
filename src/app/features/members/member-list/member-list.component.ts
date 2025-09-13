import { Component, inject } from '@angular/core';
import { MemberService } from '../../../core/services/member.service';
import { Observable } from 'rxjs';
import { Member } from '../../../shared/models/membet';
import { AsyncPipe } from '@angular/common';
import { MemberCardComponent } from '../member-card/member-card.component';
import { Pagination } from '../../../shared/models/pagination';
import { MemberParams } from '../../../shared/models/memberParams';
import { PaginatorComponent } from '../../../shared/paginator/paginator.component';

@Component({
  selector: 'app-member-list',
  imports: [AsyncPipe, MemberCardComponent, PaginatorComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent {
  private memberService = inject(MemberService);
  protected paginatedMembers$!: Observable<Pagination<Member>>;
  params = new MemberParams();

  constructor() {
    this.loadMembers();
  }

  loadMembers() {
    this.paginatedMembers$ = this.memberService.getMembers(this.params);
  }

  onPageChange(event: { pageIndex: number; pageSize: number }) {
    this.params.pageNumber = event.pageIndex;
    this.params.pageSize = event.pageSize;
    this.loadMembers();
  }


}