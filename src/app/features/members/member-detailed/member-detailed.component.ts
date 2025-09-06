import { Component, computed, inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { AccounService } from '../../../core/services/accoun.service';
import { MemberService } from '../../../core/services/member.service';
import { AgeCalculatorPipe } from '../../../shared/pipes/age-calculator.pipe';


@Component({
  selector: 'app-member-detailed',
  imports: [RouterOutlet, AgeCalculatorPipe,RouterModule],
  templateUrl: './member-detailed.component.html',
  styleUrl: './member-detailed.component.css'
})
export class MemberDetailedComponent implements OnDestroy {
  protected memberService = inject(MemberService);
  private accountService = inject(AccounService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  protected isCurrentUser = computed(() => {
    return this.accountService.currentUser()?.id === this.memberService.member()?.id.toLocaleLowerCase();
  });

  constructor() {
    const memberId = this.route.snapshot.paramMap.get('id')!;
    this.memberService.getMember(memberId);
  }

  ngOnDestroy(): void {
    this.memberService.editMode.set(false);
  }

  likeUser() {
    // TODO: Implement like functionality
    console.log('Like user clicked');
  }

  goBack() {
    this.router.navigateByUrl('/members');
  }

  toggleEditMode() {
    this.memberService.editMode.set(!this.memberService.editMode());
  }
}