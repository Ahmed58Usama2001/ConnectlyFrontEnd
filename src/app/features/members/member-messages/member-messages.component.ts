import { Component, inject, OnInit, signal, ViewChild, ElementRef, AfterViewChecked, OnDestroy } from '@angular/core';
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
export class MemberMessagesComponent implements OnInit, OnDestroy {
 
  protected messagesService = inject(MessageService);
  private route = inject(ActivatedRoute);
  protected memberService = inject(MemberService);
  protected presenceService = inject(PresenceService);
  protected messageContent = '';
  private otherUserId = '';

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe({
      next: params => {
        const userId = params.get('id');
        
        if (!userId) throw new Error('Cannot connect to hub');
        this.otherUserId = userId;
        this.messagesService.createHubConnection(userId);
      }
    });
  }

  SendMessage(event?: KeyboardEvent) {
    if (event) {
      event.preventDefault();
    }
    
    if (!this.otherUserId || !this.messageContent.trim()) return;
    
    const messageToSend = this.messageContent;
    this.messageContent = ''; // Clear immediately
    
    this.messagesService.sendMessage(this.otherUserId, messageToSend)
      ?.catch(error => {
        console.log(error);
      });
  }

  ngOnDestroy(): void {
    this.messagesService.stopHubConnection();
  }
}