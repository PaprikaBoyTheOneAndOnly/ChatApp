import {Component, OnInit} from '@angular/core';
import {AppService} from "../app.service";
import {CHAT_STATUS, IAccount, IChat} from "../data-model";
import {FormBuilder, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  chats: IChat[];
  user: IAccount;

  messageForm = this.fb.group(
    {
      text: new FormControl('', Validators.required)
    });

  constructor(private service: AppService, private fb: FormBuilder) {
  }

  ngOnInit() {
    const account: IAccount = JSON.parse(localStorage.getItem('account'));
    if (account == null) {
      window.location.href = '/login';
    }

    this.service.getChatFromAccount(account).subscribe(response => {
      this.chats = response;
    }, error => {
      console.log(`ERROR: ${error}`);
    });

    this.user = JSON.parse(localStorage.getItem('account'));
  }

  sendMessage() {
    if(this.messageForm.valid) {
      this.chats[0].messages.push({
        status: CHAT_STATUS.SENT,
        text: this.messageForm.get("text").value
      });

      this.messageForm.reset("text");
    }
  }

}
