import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { Member } from '../../shared/models/membet';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private baseUrl = environment.apiUrl + 'members/';
  private http = inject(HttpClient);

  getMembers(){
    return this.http.get<Member[]>(this.baseUrl);
  }

  getMember(id: string){
    return this.http.get<Member>(this.baseUrl+id);
  }
}
