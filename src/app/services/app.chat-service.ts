import {Injectable} from '@angular/core';
import {Observable, Observer} from 'rxjs';
import {IAccount, IChat, IFile, IMessage} from '../data-model';
import {CompatClient, Stomp} from '@stomp/stompjs';
import {select, Store} from '@ngrx/store';
import {getServerPort} from '../store/app.configurations';
import {getAccount} from '../store/login.reducer';
import {HttpClient} from '@angular/common/http';
import * as SockJS from "sockjs-client";
import * as io from 'socket.io-client';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  protected stompClient: CompatClient | CoverClient;
  protected account: IAccount;
  private serverPort: number;
  private baseUrl: string;

  constructor(private store: Store<any>,
              private httpClient: HttpClient) {
    store.pipe(select(getServerPort)).subscribe(port => {
      this.serverPort = port;
      this.baseUrl = '//localhost:' + this.serverPort;
    });
    store.pipe(select(getAccount)).subscribe(account => {
      this.account = account;
    });
  }
  // View | Appearance | Toolbar.
  subscribe(observer: Observer<IMessage>) {
    const username = this.account == undefined ? '' : `?username=${this.account.username}`;
    this.stompClient = environment.serverEnv == 'spring' ?
      Stomp.over(new SockJS('http:' +this.baseUrl + '/my-chat-app' + username)) :
      new CoverClient(io('http:'+this.baseUrl), this.account.username);
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
    return this.httpClient.get<IChat[]>(`${this.baseUrl}/loadChats?username=${username}`);
  }

  sendMessage(message: IMessage) {
    this.stompClient.send('/chatApp/sendMessage', {}, JSON.stringify(message));
  }

  sendFile(file: any, from: string, to: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('from', from);
    formData.append('to', to);

    this.httpClient.post(`${this.baseUrl}/sendFile`, formData).subscribe(s => {
      console.log(s);
    })
  }

  downloadFile(lol) {
    console.log('download');
    this.httpClient.get(`${this.baseUrl}/downloadFile`).subscribe( file => {
      lol.load(file);
    })
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

  debug;
  disconnect;


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
