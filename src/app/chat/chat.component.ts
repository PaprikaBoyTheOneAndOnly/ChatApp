import { Component, OnInit } from '@angular/core';
import {AppService} from "../app.service";
import {IAccount, IChat} from "../data-model";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  chat:IChat;

  constructor(private service: AppService) { }

  ngOnInit() {
    const account:IAccount = JSON.parse(localStorage.getItem('account'));
    if(account == null) {
      window.location.href = '/login';
    }

    this.service.getChatFromAccount(account).subscribe(response => {
      console.log(response)
        this.chat = response.chat;
        console.log(this.chat)
    }, error => {
      console.log(error);
    })
  }

}
