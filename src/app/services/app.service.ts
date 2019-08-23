import * as SockJS from 'sockjs-client';
import {Stomp} from "@stomp/stompjs";
import {select, Store} from "@ngrx/store";
import {Injector} from "@angular/core";

export class Service {
  protected stompClient;
  private serverPort = 8080;

  constructor(injector: Injector) {
    const store = injector.get(Store);
    store.pipe(select('config'), select('serverPort')).subscribe(port => {
      this.serverPort = port;
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
