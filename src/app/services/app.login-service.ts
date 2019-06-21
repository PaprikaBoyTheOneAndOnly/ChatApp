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
  test: Promise<IAccount> = new Promise<IAccount>(() => {
  });

  constructor() {
    const socket = new SockJS('http://localhost:8080/my-chat-app');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, (frame) => {
      console.log("Connected: " + frame);
      /*this.test = new Promise<IAccount>((resolve) => {
        console.log("here");*/
      this.stompClient.subscribe('/login/setLogin', validLogin => {
        return of(validLogin);
      });
    });
  }

  validateLogin(account: IAccount) {
    this.stompClient.send('/chatApp/validate', {}, JSON.stringify(account));
  }

  onResponse(): Promise<IAccount> {
    return this.test;
  }

  disconnect() {
    this.stompClient.disconnect();
  }

}
