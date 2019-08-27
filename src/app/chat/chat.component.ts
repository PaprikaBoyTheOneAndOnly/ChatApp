import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {IAccount, IChat, IMessage} from '../data-model';
import {ChatService} from '../services/app.chat-service';
import {MatDialog} from "@angular/material";
import {ChatModalComponent} from "./chat-modal/chat-modal.component";
import {Router} from "@angular/router";
import {getAccount, IClientState} from "../store/login.reducer";
import {select, Store} from "@ngrx/store";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  currentChatUserTo = 'Username';
  allChats: IChat[];
  account: IAccount;
  error: '';

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

        if ('text' in value) { //typeOf IMessage
          this.allChats.forEach(chat => {
            let chatWith = this.account.username === value.from ? value.to : value.from;
            if (chat.chatWith === chatWith) {
              chat.messages.push(value);
            }
          });
        } else {
          this.allChats = value;
          console.log(this.getCurrentChat())
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
      if (chat.chatWith === username) {
        this.currentChatUserTo = username;
      }
    });
  }

  addChat() {
    const until$ = new Subject();
    until$.complete()
    this.dialog.open(ChatModalComponent, {data: {}})
      .afterClosed()
      .pipe(takeUntil(until$))
      .subscribe(result => {
        if (result && !this.isExistingChat(result)) {
          this.allChats.push({
            chatWith: result,
            messages: [],
          })
        } else {
          this.currentChatUserTo = result;
        }
        until$.complete();
      });
  }

  getCurrentChat(): IChat {
    let curChat;
    if (this.allChats) {
      this.allChats.forEach(chat => {
        if (chat.chatWith === this.currentChatUserTo) {
          curChat = chat;
        }
      })
    }

    return curChat;
  }

  private isExistingChat(username): boolean {
    return !!this.allChats.find(chat => chat.chatWith === username);
  }
}
