import {Inject} from "@angular/core";
import {SERVER_PORT} from "../app.configurations";

export class Service {
  constructor(@Inject(SERVER_PORT) protected serverPort: number) {
  }
}
