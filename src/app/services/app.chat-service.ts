import {Inject, Injectable, Injector} from '@angular/core';
import {Observer} from 'rxjs';
import {IAccount, IMessage} from '../data-model';
import {Service} from "./app.service";

@Injectable({
  providedIn: 'root'
})
export class ChatService extends Service {

  constructor(injector: Injector) {
    super(injector);
  }

  isExistingAccount(observer: Observer<string>, username: string) {
    super.connect(() => {
      this.stompClient.subscribe('/user/chat/isExistingAccount', (response) => {
         if (response.body.includes('NOT_FOUND')) {
          const body = JSON.parse(response.body.replace('NOT_FOUND', 404));
          observer.error(body.reason);
        } else {
          observer.next(response.body);
        }
      });
      this.stompClient.send('/chatApp/isExistingAccount', {}, username);
    });
  }

  subscribe(observer: Observer<IMessage>) {
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
      this.stompClient.send('/chatApp/getMessages', {}, JSON.stringify(this.account));
    }, this.account.username);
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
