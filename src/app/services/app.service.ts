import * as SockJS from 'sockjs-client';
import {Stomp} from "@stomp/stompjs";

export class Service {
  protected stompClient;

  constructor(private serverPort: number) {
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
