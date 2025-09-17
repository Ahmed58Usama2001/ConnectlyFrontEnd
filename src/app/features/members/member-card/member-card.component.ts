import { Component, input, computed } from '@angular/core';
import { Member } from '../../../shared/models/membet';
import { RouterModule } from '@angular/router';
import { TimeAgoPipe } from '../../../shared/pipes/time-ago.pipe';
import { PlatformDaysPipe } from '../../../shared/pipes/platform-days.pipe';
import { AgeCalculatorPipe } from '../../../shared/pipes/age-calculator.pipe';

@Component({
  selector: 'app-member-card',
  imports: [RouterModule,TimeAgoPipe , PlatformDaysPipe, AgeCalculatorPipe],
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

}