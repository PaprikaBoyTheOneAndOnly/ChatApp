import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {IAccount, IMessage} from '../data-model';
import {ChatService} from '../services/app.chat-service';
import {MatDialog} from "@angular/material";
import {ChatModalComponent} from "./add-chat-modal/chat-modal.component";
import {Router} from "@angular/router";
import {getAccount, IClientState} from "../store/login.reducer";
import {select, Store} from "@ngrx/store";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  currentChat: any[] = [];
  currentChatUserTo = '';
  allChats: any[];
  account: IAccount;
  error: '';
  Object = Object;

  messageForm = this.fb.group({
    text: new FormControl('', Validators.required)
  });

  constructor(private service: ChatService,
              private fb: FormBuilder,
              private router: Router,
              private dialog: MatDialog,
              private store: Store<IClientState>) {
    this.store.pipe(select(getAccount)).subscribe(account => {
      this.account = account;
    })
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
    });
  }

  sendMessage() {
    if (this.messageForm.valid) {
      const message = {
        from: this.account.username,
        to: this.currentChatUserTo,
        text: this.messageForm.controls.text.value,
      };
      this.service.sendMessage(message);
      this.messageForm.controls.text.setValue('');
    }
  }

  private scrollToBottom() {
    let chatField = document.querySelector('.chat-field');
    chatField.scrollTop = chatField.scrollHeight - chatField.clientHeight;
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

  showChat(username: string) {
    this.allChats.forEach(chat => {
      if (Object.keys(chat)[0] === username) {
        this.currentChat = <Array<any>>Object.values(chat)[0];
        this.currentChatUserTo = username;
      }
    });
  }

  addChat() {
    let dialogRef = this.dialog.open(ChatModalComponent, {
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
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
