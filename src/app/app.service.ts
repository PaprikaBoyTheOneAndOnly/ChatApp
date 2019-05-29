import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {IAccount} from "./data-model";

@Injectable({
  providedIn: "root"
})
export class AppService {

  constructor(private http: HttpClient) {
  }

  getMessage(): Observable<string> {
    return this.http.get<string>("http://localhost:8080/ChatAppService_war/hello");
  }


  validateInput(account: IAccount): any {
    return this.http.post<any>("http://localhost:8080/ChatAppService_war/validateAccount",
      JSON.stringify(account), {
        headers: {'Content-Type': 'application/json; charset=utf-8'}
      }
    );
  }

  createAccount(account: IAccount): any {
    return this.http.post<any>("http://localhost:8080/ChatAppService_war/createNewAccount",
      JSON.stringify(account), {
        headers: {'Content-Type': 'application/json; charset=utf-8'}
      }
    );
  }

  getChatFromAccount(account: IAccount) {
    return this.http.post<any>("http://localhost:8080/ChatAppService_war/getChatFromAccount",
      JSON.stringify(account), {
        headers: {'Content-Type': 'application/json; charset=utf-8'}
      }
    );
  }
}
