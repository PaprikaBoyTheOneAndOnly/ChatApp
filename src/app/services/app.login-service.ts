import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {IAccount} from "../data-model";
import * as SockJS from 'sockjs-client';
import {Stomp} from "@stomp/stompjs";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  private stompClient;
  private connected = false;

  constructor() {
    const socket = new SockJS('/my-chat-app');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, (frame) => {
      console.log("Connected: " + frame)
      this.connected = true;
    })
  }

  validateLogin(account: IAccount) {
    this.stompClient.send('/chat-app/validateLogin', {}, JSON.stringify(account));
  }

  onResponse(): Observable<boolean> {
    return this.stompClient.subscribe('/user/login/setLogin', validLogin => {
      return of(validLogin);
    });
  }

  disconnect() {

  }
}
