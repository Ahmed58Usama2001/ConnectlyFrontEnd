import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Pagination } from '../../shared/models/pagination';
import { Message } from '../../shared/models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private baseUrl = environment.apiUrl + 'messages';
  private http = inject(HttpClient);

  getMessages( container: string , pageIndex: number, pageSize: number,) {
    let params = new HttpParams();

    params = params.append('pageSize', pageSize);
    params = params.append('pageIndex',pageIndex);
    params = params.append('container', container);
    return this.http.get<Pagination<Message>>(`${this.baseUrl}`, { params });
  }

  getMessageThread(memberId: string) {
    return this.http.get<Message[]>(`${this.baseUrl}/thread/${memberId}`);
  }
}
