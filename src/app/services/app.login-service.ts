import {Injectable} from "@angular/core";
import {observable, Observable, of} from "rxjs";
import {IAccount} from "../data-model";
import * as SockJS from 'sockjs-client';
import {Stomp} from "@stomp/stompjs";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  private stompClient;

  constructor() {
    const socket = new SockJS('http://localhost:8080/my-chat-app');
    this.stompClient = Stomp.over(socket);

  }

  connect(observer) {
    this.stompClient.connect({}, (frame) => {
      this.stompClient.subscribe("/setLogin", response => {
        console.log(response);
      });
    });
  }

  validateLogin(account: IAccount) {
    this.stompClient.send('/chat-app/validateLogin', {}, JSON.stringify(account));
  }


  disconnect() {
    this.stompClient.disconnect();
  }

}
