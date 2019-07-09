import {Inject, Injectable} from '@angular/core';
import {Observer} from 'rxjs';
import {IAccount} from '../data-model';
import {Service} from "./app.service";
import {SERVER_PORT} from "../app.configurations";

@Injectable({
  providedIn: 'root'
})
export class AccountService extends Service {

  constructor(@Inject(SERVER_PORT) private portForSuperclass: number) {
    super(portForSuperclass);
  }

  validateLogin(account: IAccount) {
    this.stompClient.send('/chatApp/validate', {}, JSON.stringify(account));
  }

  createAccount(account: IAccount) {
    this.stompClient.send('/chatApp/createAccount', {}, JSON.stringify(account));
  }

  subscribe(observer: Observer<IAccount>) {
    super.connect(() => {
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

  disconnect() {
    this.stompClient.disconnect();
  }
}
