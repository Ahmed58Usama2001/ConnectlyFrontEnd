import { Component, inject, OnInit, signal } from '@angular/core';
import { MessageService } from '../../core/services/message.service';
import { Pagination } from '../../shared/models/pagination';
import { Message } from '../../shared/models/message';

@Component({
  selector: 'app-messages',
  imports: [],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent implements OnInit {
  private messageService = inject(MessageService);
  protected container = 'Inbox'
  protected pageIndex = 1
  protected pageSize = 10
  protected paginatedMessages = signal<Pagination<Message> | null>(null);

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this.messageService.getMessages(this.container, this.pageIndex, this.pageSize).subscribe({
      next: (response) => {
        this.paginatedMessages.set(response);
      }
    });
  }
}
