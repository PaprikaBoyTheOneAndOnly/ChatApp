import {Injectable} from '@angular/core';
import {Stomp} from '@stomp/stompjs';
import {Observer} from 'rxjs';
import * as SockJS from 'sockjs-client';
import {IAccount, IMessage} from '../data-model';

@Injectable({
  providedIn: 'root'
})
  export class ChatService {
  private stompClient;

  constructor() {
  }

  subscribe(observer: Observer<IMessage>, account: IAccount) {
    this.connect(() => {
      this.stompClient.send('/chatApp/connect', {}, JSON.stringify(account));
      this.stompClient.subscribe('/user/chat/receiveMessage', (response) => {
        const body = JSON.parse(response.body.replace('FORBIDDEN', 403));
        if (body.code === '403') {
          observer.error(body.reason);
        } else {
          observer.next(body);
        }
      });

      this.stompClient.subscribe('/user/chat/receiveChats', (response) => {
        const body = JSON.parse(response.body.replace('FORBIDDEN', 403));

        if (body.code === '403') {
          observer.error(body.reason);
        } else {
          observer.next(body);
        }
      });
      this.stompClient.send('/chatApp/getMessages', {}, JSON.stringify(account));
    });
  }


  sendMessage(message: IMessage) {
    this.stompClient.send('/chatApp/sendMessage', {}, JSON.stringify(message));
  }

  private connect(callback) {
    const socket = new SockJS('http://localhost:8080/my-chat-app');
    this.stompClient = Stomp.over(socket);
    this.stompClient.debug = () => {
    };
    this.stompClient.connect({ },
      () => callback());
  }


  disconnect() {
    this.stompClient.disconnect();
  }


}
