import {Injectable} from '@angular/core';
import {Observable, Observer} from 'rxjs';
import {IAccount, IChat, IMessage} from '../data-model';
import {CompatClient, Stomp} from '@stomp/stompjs';
import {select, Store} from '@ngrx/store';
import {getServerPort} from '../store/app.configurations';
import {getAccount} from '../store/login.reducer';
import {HttpClient} from '@angular/common/http';
import * as SockJS from "sockjs-client";
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  protected stompClient;
  protected account: IAccount;
  private serverPort: number;

  constructor(private store: Store<any>,
              private httpClient: HttpClient) {
    store.pipe(select(getServerPort)).subscribe(port => {
      this.serverPort = port;
    });
    store.pipe(select(getAccount)).subscribe(account => {
      this.account = account;
    });
  }

  subscribe(observer: Observer<IMessage>) {
    const username = this.account == undefined ? '' : `?username=${this.account.username}`;
    // @ts-ignore
    this.stompClient = process.env.SERVER_ENV == 'spring' ?
      Stomp.over(new SockJS('http://localhost:' + this.serverPort + '/my-chat-app' + username)) :
      new CoverClient(io('http://localhost:8999'), this.account.username);
    this.stompClient.debug = () => {
    };

    this.stompClient.connect({}, () => {
      this.stompClient.subscribe('/user/chat/receiveMessage', (response) => {
        const body = JSON.parse(response.body.replace('FORBIDDEN', '403'));
        if (body.code === '403') {
          observer.error(body.reason);
        } else {
          observer.next(body);
        }
      });
    });
  }

  loadAllChats(username: string): Observable<IChat[]> {
    return this.httpClient.get<IChat[]>(`//localhost:${this.serverPort}/loadChats?username=${username}`);
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

class CoverClient {
  constructor(private socketIoClient, private username) {
  }

  send(destination: string, headers: any, body: any) {
    this.socketIoClient.emit(destination, body);
  }

  subscribe(destination: string, callback: Function) {
    this.socketIoClient.on(destination, callback);
  }

  connect(...args: any[]) {
    if (args[1] != undefined && !args[1].connected) {
      this.socketIoClient.emit('/chatApp/setUserName', this.username);
      args[1]();
    }
  }
}
