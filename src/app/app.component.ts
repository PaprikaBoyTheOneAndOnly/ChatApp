import {Component} from '@angular/core';
import {AppService} from "./app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  message = 'Hello from Angular';

  constructor(private service: AppService) {
  }

  loadMessage() {
    this.service.getMessage().subscribe(message => {
      console.log(message)
      this.message = message;
    });
  }
}
