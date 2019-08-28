import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {IAccount, IChat, IMessage} from '../data-model';
import {ChatService} from '../services/app.chat-service';
import {MatDialog} from '@angular/material';
import {ChatModalComponent} from './chat-modal/chat-modal.component';
import {Router} from '@angular/router';
import {getAccount, IClientState} from '../store/login.reducer';
import {select, Store} from '@ngrx/store';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  currentChat: IChat = null;
  allChats: IChat[];
  account: IAccount;
  error: '';

  messageForm = this.fb.group({
    text: new FormControl('', Validators.required)
  });

  private destroyed$ = new Subject();

  constructor(private service: ChatService,
              private fb: FormBuilder,
              private router: Router,
              private dialog: MatDialog,
              private store: Store<IClientState>) {
    this.store.pipe(takeUntil(this.destroyed$), select(getAccount))
      .subscribe(account => {
        this.account = account;
        this.allChats = this.account.chats;
        this.setCurrentChat(account.username);
      });
  }

  ngOnInit() {
    this.service.subscribe({
      next: message => {
        this.allChats.forEach(chat => {
          let chatWith = this.account.username === message.from ? message.to : message.from;
          if (chat.chatWith === chatWith) {
            chat.messages.push(message);
          }
        });

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
        to: this.currentChat.chatWith,
        text: this.messageForm.controls.text.value,
      };
      this.service.sendMessage(message);
      this.messageForm.controls.text.setValue('');
    }
  }

  scrollToBottom() {
    let chatField = document.querySelector('.chat-field');
    chatField.scrollTop = chatField.scrollHeight - chatField.clientHeight;
  }

  wasSent(message: IMessage): string {
    if (message.to === this.account.username) {
      return '1';
    } else {
      return '0';
    }
  }

  addChat() {
    const until$ = new Subject();
    until$.complete();
    this.dialog.open(ChatModalComponent, {data: {}})
      .afterClosed()
      .pipe(takeUntil(until$))
      .subscribe(result => {
        if (result) {
          if (!this.isExistingChat(result)) {
            const chat: IChat = {
              chatWith: result,
              messages: [],
            };
            this.allChats.push(chat);
            this.currentChat = chat;
          } else {
            this.setCurrentChat(result);
          }
        }

        until$.complete();
      });
  }

  setCurrentChat(username: string) {
    if (this.allChats.length > 0) {

      this.allChats.forEach(chat => {
        if (chat.chatWith === username) {
          this.currentChat = chat;
        }
      });
    }
  }

  getCurrentChat(): IChat {
    return this.currentChat;
  }

  ngOnDestroy() {
    this.service.disconnect();
    this.destroyed$.next();
  }

  private isExistingChat(username): boolean {
    return !!this.allChats.find(chat => chat.chatWith === username);
  }
}
