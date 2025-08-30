import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Member, Photo } from '../../shared/models/membet';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private baseUrl = environment.apiUrl + 'members/';
  private http = inject(HttpClient);
  editMode = signal(false);

  getMembers(){
    return this.http.get<Member[]>(this.baseUrl);
  }

  getMember(id: string){
    return this.http.get<Member>(this.baseUrl+id);
  }

  getMemberPhotos(id: string){
    return this.http.get<Photo[]>(this.baseUrl+id+'/photos');
  }
}
