import { Component, input, computed, inject } from '@angular/core';
import { Member } from '../../../shared/models/membet';
import { RouterModule } from '@angular/router';
import { TimeAgoPipe } from '../../../shared/pipes/time-ago.pipe';
import { PlatformDaysPipe } from '../../../shared/pipes/platform-days.pipe';
import { AgeCalculatorPipe } from '../../../shared/pipes/age-calculator.pipe';
import { LikesService } from '../../../core/services/likes.service';

@Component({
  selector: 'app-member-card',
  imports: [RouterModule, TimeAgoPipe, PlatformDaysPipe, AgeCalculatorPipe],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css'
})
export class MemberCardComponent {
  private likesService = inject(LikesService);
  member = input.required<Member>();

  protected isLiked = computed(() => this.likesService.likeIds().includes(this.member().id));

}