import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {IAccount, IMessage} from '../data-model';
import {ChatService} from '../services/app.chat-service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  currentChat: any[] = [];
  allChats: any[];
  account: IAccount;
  error: '';
  Object = Object;

  messageForm = this.fb.group({
    toUser: new FormControl('', Validators.required),
    text: new FormControl('', Validators.required)
  });

  constructor(private service: ChatService,
              private fb: FormBuilder) {
    const account: IAccount = JSON.parse(localStorage.getItem('account'));
    if (account == null) {
      window.location.href = '/login';
    }
    this.account = account;

  }

  ngOnInit() {
    this.service.subscribe({
      next: value => {
        if (value.to === undefined) {
          const chats = Object.values(value)[0];
          if (chats !== undefined) {
            this.allChats = parseChats(value);
            this.currentChat = chats;
          }
        } else {
          this.currentChat.push(value);
        }
        this.error = '';
      },
      error: err => {
        this.error = err;
      },
      complete: () => {

      }
    }, this.account);
  }

  sendMessage() {
    if (this.messageForm.valid) {
      const message = {
        from: this.account.username,
        to: this.messageForm.controls.toUser.value,
        text: this.messageForm.controls.text.value,
      };
      this.service.sendMessage(message);
      this.messageForm.controls.text.setValue('');
    }
  }

  ngOnDestroy(): void {
    this.service.disconnect();
  }

  wasSent(message: IMessage): string {
    if (message.to === this.account.username) {
      return '1';
    } else {
      return '0';
    }
  }

  showChat(strings: string) {
    this.allChats.forEach(chat => {
      if (Object.keys(chat)[0] === strings) {
        // @ts-ignore
        this.currentChat =  Object.values(chat)[0];
      }
    });
  }
}

function parseChats(object: any) {
  const keys = Object.keys(object);
  const values = Object.values(object);
  const chats = [];

  for (let i = 0; i < keys.length; i++) {
    const obj = new Object();
    obj[keys[i]] = values[i];
    chats.push(obj);
  }

  return chats;
}
