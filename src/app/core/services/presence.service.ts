import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ToastService } from './toast.service';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { User } from '../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {

  private hubUrl = environment.hubUrl;
  private toastService= inject(ToastService);
 hubConnection? : HubConnection;

  CreateHubConnection(user: User){
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'presence', {
        accessTokenFactory: () => user.token
      })
      .withAutomaticReconnect()
      .build();

      this.hubConnection.start().catch(error => console.log(error));

      this.hubConnection.on('UserIsOnline', email => {
        this.toastService.Success(email + ' has connected');
      });

      this.hubConnection.on('UserIsOffline', email => {
        this.toastService.Info(email + ' has disconnected');
      });
  }

  StopHubConnection(){
    if(this.hubConnection?.state ===HubConnectionState.Connected)
      this.hubConnection.stop().catch(error => console.log(error));
  }
}
