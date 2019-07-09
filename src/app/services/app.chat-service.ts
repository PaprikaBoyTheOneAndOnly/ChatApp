import {Inject, Injectable} from '@angular/core';
import {Observer} from 'rxjs';
import {IAccount, IMessage} from '../data-model';
import {Service} from "./app.service";
import {SERVER_PORT} from "../app.configurations";

@Injectable({
  providedIn: 'root'
})
  export class ChatService extends Service{

  constructor(@Inject(SERVER_PORT) private portForSuperclass: number) {
    super(portForSuperclass);
  }

  subscribe(observer: Observer<IMessage>, account: IAccount) {
    super.connect(() => {
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
    }, account.username);
  }


  sendMessage(message: IMessage) {
    this.stompClient.send('/chatApp/sendMessage', {}, JSON.stringify(message));
  }

  disconnect() {
    this.stompClient.disconnect();
  }


}
