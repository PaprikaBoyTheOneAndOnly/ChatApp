import {Injectable} from '@angular/core';
import {Observer} from 'rxjs';
import {IAccount, IMessage} from '../data-model';
import * as SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';
import {select, Store} from '@ngrx/store';
import {getServerPort} from '../app.configurations';
import {getAccount} from '../store/login.reducer';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  protected stompClient;
  protected account: IAccount;
  private serverPort: number;

  constructor(private store: Store<any>) {
    store.pipe(select(getServerPort)).subscribe(port => {
      this.serverPort = port;
    });
    store.pipe(select(getAccount)).subscribe(account => {
      this.account = account;
    });
  }

  subscribe(observer: Observer<IMessage>) {
    const username = this.account == undefined ? '' : `?username=${this.account.username}`;

    const socket = new SockJS('http://localhost:' + this.serverPort + '/my-chat-app' + username);
    this.stompClient = Stomp.over(socket);
    this.stompClient.debug = () => {
    };

    this.stompClient.connect({}, () => {
      this.stompClient.subscribe('/user/chat/receiveMessage', (response) => {
        const body = JSON.parse(response.body.replace('FORBIDDEN', 403));

        if (body.code === '403') {
          observer.error(body.reason);
        } else {
          observer.next(body);
        }
      });
    });
  }

  sendMessage(message: IMessage) {
    this.stompClient.send('/chatApp/sendMessage', {}, JSON.stringify(message));
  }

  disconnect() {
    if (this.stompClient) {
      this.stompClient.disconnect();
    }
  }
}
