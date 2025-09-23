import { Component, inject, OnInit, signal } from '@angular/core';
import { MessageService } from '../../../core/services/message.service';
import { MemberService } from '../../../core/services/member.service';
import { Message } from '../../../shared/models/message';
import { DatePipe } from '@angular/common';
import { TimeAgoPipe } from '../../../shared/pipes/time-ago.pipe';

@Component({
  selector: 'app-member-messages',
  imports: [DatePipe,TimeAgoPipe],
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.css'
})
export class MemberMessagesComponent implements OnInit {
  private messagesService = inject(MessageService);
  private memberService = inject(MemberService);
  protected messages = signal<Message[]>([]);

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    const memberId =this.memberService.member()!.id;
      this.messagesService.getMessageThread(this.memberService.member()!.id).subscribe({
        next: response => {
          this.messages.set(response.map(m => ({...m, currentUserSender : m.senderId !== memberId})));
        }
      });
  }
}