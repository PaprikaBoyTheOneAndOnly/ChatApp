import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IAccount} from '../data-model';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl = '//localhost:8090/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(private http: HttpClient) {
  }

  isValidLogin(account: IAccount): Observable<IAccount> {
    return this.http.post<IAccount>(`${this.baseUrl}isValidLogin`, account, this.httpOptions);
  }

  createAccount(account: IAccount): Observable<IAccount> {
    return this.http.post<IAccount>(`${this.baseUrl}createAccount`, account, this.httpOptions);
  }

  isExistingAccount(username: String): Observable<boolean> {
      return this.http.get<boolean>(`${this.baseUrl}isExistingAccount?username=${username}`);
  }
}
