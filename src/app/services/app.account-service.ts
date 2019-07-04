import {Inject, Injectable} from '@angular/core';
import {Stomp} from '@stomp/stompjs';
import {Observer} from 'rxjs';
import * as SockJS from 'sockjs-client';
import {IAccount} from '../data-model';
import {HttpHeaders} from '@angular/common/http';
import {Service} from "./app.service";

@Injectable({
  providedIn: 'root'
})
export class AccountService extends Service {
  private stompClient;

  constructor() {
    super(null);
  }

  validateLogin(account: IAccount) {
    this.stompClient.send('/chatApp/validate', {}, JSON.stringify(account));
  }

  createAccount(account: IAccount) {
    this.stompClient.send('/chatApp/createAccount', {}, JSON.stringify(account));
  }

  subscribe(observer: Observer<IAccount>) {
    this.connect(() => {
      this.stompClient.subscribe('/user/login/setLogin', (response) => {
        const body = JSON.parse(response.body.replace('FORBIDDEN', 403));

        if (body.code === '403') {
          observer.error(body.reason);
        } else {
          observer.next(body);
        }
      });
    });
  }

  private connect(callback) {
    const socket = new SockJS('http://localhost:' + this.serverPort + '/my-chat-app');
    this.stompClient = Stomp.over(socket);
    this.stompClient.debug = () => {
    };

    let thisheaders = new HttpHeaders();
    thisheaders.append('login', 'peter');

    this.stompClient.connect(thisheaders,
      () => callback());
  }


  disconnect() {
    this.stompClient.disconnect();
  }


}
