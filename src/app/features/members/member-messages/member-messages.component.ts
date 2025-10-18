import { Component, inject, OnInit, signal, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { MessageService } from '../../../core/services/message.service';
import { MemberService } from '../../../core/services/member.service';
import { Message } from '../../../shared/models/message';
import { DatePipe } from '@angular/common';
import { TimeAgoPipe } from '../../../shared/pipes/time-ago.pipe';
import { FormsModule } from '@angular/forms';
import { PresenceService } from '../../../core/services/presence.service';

@Component({
  selector: 'app-member-messages',
  imports: [DatePipe, TimeAgoPipe, FormsModule],
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.css'
})
export class MemberMessagesComponent implements OnInit, AfterViewChecked {
  @ViewChild('messagesContainer', { static: false }) messagesContainer!: ElementRef;
  
  private messagesService = inject(MessageService);
  protected memberService = inject(MemberService);
  protected presenceService = inject(PresenceService)
  protected messages = signal<Message[]>([]);
  protected messageContent = '';
  
  private shouldScrollToBottom = false;

  ngOnInit(): void {
    this.loadMessages();
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  private scrollToBottom(): void {
    try {
      if (this.messagesContainer) {
        const container = this.messagesContainer.nativeElement;
        container.scrollTop = container.scrollHeight;
      }
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }

  loadMessages() {
    this.messagesService.getMessageThread(this.memberService.member()!.id).subscribe({
      next: _ => {
        this.shouldScrollToBottom = true;
      }
    });
  }

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