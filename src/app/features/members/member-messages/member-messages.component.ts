import { Component, inject, OnInit, signal, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { MessageService } from '../../../core/services/message.service';
import { MemberService } from '../../../core/services/member.service';
import { Message } from '../../../shared/models/message';
import { DatePipe } from '@angular/common';
import { TimeAgoPipe } from '../../../shared/pipes/time-ago.pipe';
import { FormsModule } from '@angular/forms';
import { PresenceService } from '../../../core/services/presence.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-messages',
  imports: [DatePipe, TimeAgoPipe, FormsModule],
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.css'
})
export class MemberMessagesComponent implements OnInit {
  
  protected messagesService = inject(MessageService);
  private route = inject(ActivatedRoute)
  protected memberService = inject(MemberService);
  protected presenceService = inject(PresenceService)
  protected messages = signal<Message[]>([]);
  protected messageContent = '';
  
  private shouldScrollToBottom = false;

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe({
      next: params=> {
        const otherUserId = params.get('id');

        
        if(!otherUserId) throw new Error('Cannot connect to hub');
        this.messagesService.createHubConnection(otherUserId);
      }
    });
  }

 

 
  // loadMessages() {
  //   this.messagesService.getMessageThread(this.memberService.member()!.id).subscribe({
  //     next: _ => {
  //       this.shouldScrollToBottom = true;
  //     }
  //   });
  // }

  SendMessage() {
    const recipientId = this.memberService.member()?.id;
    if (!recipientId || !this.messageContent.trim()) return;
    
    this.messagesService.sendMessage(recipientId, this.messageContent).subscribe({
      next: message => {
        this.messages.update(messages => {
          message.currentUserSender = true;
          return [...messages, message];
        });
        this.messageContent = '';
        this.shouldScrollToBottom = true;
      }
    });
  }
}