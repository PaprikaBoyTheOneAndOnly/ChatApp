import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IAccount} from '../data-model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {select, Store} from '@ngrx/store';
import {getServerPort} from '../store/app.configurations';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token',
    })
  };

  constructor(private store: Store<any>,
              private httpClient: HttpClient) {
    store.pipe(select(getServerPort)).subscribe(port => {
      this.baseUrl = `//localhost:${port}/`;
    });

  }

  isValidLogin(account: IAccount): Observable<IAccount> {
    return this.httpClient.post<IAccount>(`${this.baseUrl}isValidLogin`, account, this.httpOptions);
  }

  createAccount(account: IAccount): Observable<IAccount> {
    return this.httpClient.post<IAccount>(`${this.baseUrl}createAccount`, account, this.httpOptions);
  }

  isExistingAccount(username: String): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.baseUrl}isExistingAccount?username=${username}`);
  }
}
