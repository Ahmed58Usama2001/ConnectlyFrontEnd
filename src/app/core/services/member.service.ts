import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { EditableMember, Member, Photo } from '../../shared/models/membet';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private baseUrl = environment.apiUrl; // e.g. "https://localhost:5001/api/"
  private http = inject(HttpClient);
  editMode = signal(false);

  getMembers() {
    return this.http.get<Member[]>(`${this.baseUrl}members`);
  }

  getMember(id: string) {
    return this.http.get<Member>(`${this.baseUrl}members/${id}`);
  }

  getMemberPhotos(id: string) {
    return this.http.get<Photo[]>(`${this.baseUrl}members/${id}/photos`);
  }

  updateMember(member: EditableMember) {
    return this.http.put(`${this.baseUrl}account`, member);
  }

}
