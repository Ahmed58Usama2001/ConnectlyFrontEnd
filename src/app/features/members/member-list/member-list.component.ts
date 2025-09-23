import { Component, inject, signal, ViewChild, viewChild } from '@angular/core';
import { MemberService } from '../../../core/services/member.service';
import { Observable, map } from 'rxjs';
import { Member } from '../../../shared/models/member';
import { AsyncPipe } from '@angular/common';
import { MemberCardComponent } from '../member-card/member-card.component';
import { Pagination } from '../../../shared/models/pagination';
import { MemberParams } from '../../../shared/models/memberParams';
import { PaginatorComponent } from '../../../shared/paginator/paginator.component';
import { FilterModalComponent } from '../../filter-modal/filter-modal.component';

@Component({
  selector: 'app-member-list',
  imports: [AsyncPipe, MemberCardComponent, PaginatorComponent, FilterModalComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent {
  @ViewChild('filterModal') modal!: FilterModalComponent;
  private memberService = inject(MemberService);
  protected paginatedMembers$!: Observable<Pagination<Member>>;
  protected params = new MemberParams();
  
  totalPages = signal(1);

  constructor() {
    this.loadMembers();
  }

  loadMembers() {
    this.paginatedMembers$ = this.memberService.getMembers(this.params).pipe(
      map(response => {
        const calculatedTotalPages = Math.ceil(response.count / this.params.pageSize) || 1;
        this.totalPages.set(calculatedTotalPages);
        return response;
      })
    );
  }

  onPageChange(event: { pageIndex: number; pageSize: number }) {
    this.params.pageNumber = event.pageIndex;
    this.params.pageSize = event.pageSize;
    this.loadMembers();
  }

  openModal(){
    this.modal.open();
  }

  resetFilters(){
    this.params = new MemberParams();
    this.loadMembers();
  }
  
  onClose(){

  }

  onFilterChange(data: MemberParams){
    this.params = data;
    this.loadMembers();
  }

}