import * as SockJS from 'sockjs-client';
import {Stomp} from "@stomp/stompjs";
import {select, Store} from "@ngrx/store";
import {Injector} from "@angular/core";
import {getServerPort} from "../app.configurations";
import {IAccount} from "../data-model";
import {getAccount} from "../store/login.reducer";

export class Service {
  protected stompClient;
  protected account: IAccount;
  private serverPort: number;

  constructor(injector: Injector) {
    const store = injector.get(Store);
    store.pipe(select(getServerPort)).subscribe(port => {
      this.serverPort = port;
    });
    store.pipe(select(getAccount)).subscribe(account => {
      this.account = account;
    })
  }

  protected connect(callback, username?) {
    username = username == undefined ? '' : `?username=${username}`;

    const socket = new SockJS('http://localhost:' + this.serverPort + '/my-chat-app' + username);
    this.stompClient = Stomp.over(socket);
    this.stompClient.debug = () => {
    };

    this.stompClient.connect({}, () => callback());
  }


}
