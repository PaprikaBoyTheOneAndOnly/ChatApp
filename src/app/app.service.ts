import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

export interface message {
  index: number;
  message: string;
}

export interface userI {
  username: string;
  password: string;
}

@Injectable()
export class AppService {

  constructor(private http: HttpClient) {
  }

  getMessage(): Observable<string> {
    return this.http.get<string>("http://localhost:8080/ChatAppService_war/hello");
  }


  validateInput(username: string, password: string):any {
    return this.http.post<any>("http://localhost:8080/ChatAppService_war/validateAccount",
      JSON.stringify({username, password, loggedIn:true}), {
        headers: {'Content-Type': 'application/json; charset=utf-8'}
      }
    );
  }
}
