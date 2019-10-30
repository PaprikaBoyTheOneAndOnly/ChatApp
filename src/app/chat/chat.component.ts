import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {IAccount, IChat, IMessage} from '../data-model';
import {ReplaySubject} from 'rxjs';
import {ChatService} from '../services/app.chat-service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {select, Store} from '@ngrx/store';
import {getAccount, IClientState} from '../store/login.reducer';
import {takeUntil} from 'rxjs/operators';
import {ChatModalComponent} from './chat-modal/chat-modal.component';
import {LogOutUser} from '../store/login.action';
import {NgForm} from '@angular/forms';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  private currentChat: IChat = null;
  private allChats: IChat[];
  private account: IAccount;
  private error: '';
  private isModalOpen = false;

  private destroyed$ = new ReplaySubject<boolean>();
  private isValidWidth = window.innerWidth >= 770;

  constructor(private service: ChatService,
              private router: Router,
              private dialog: MatDialog,
              private store: Store<IClientState>,
              private sanitizer: DomSanitizer) {
    this.store.pipe(takeUntil(this.destroyed$), select(getAccount))
      .subscribe(account => {
        this.account = account;
        if (account) {
          const sub$ = new ReplaySubject<boolean>();
          this.service.loadAllChats(account.username)
            .pipe(takeUntil(sub$))
            .subscribe(chats => {
              this.allChats = chats;
              this.setCurrentChat(account.username);
              sub$.next(true);
              sub$.complete();
            });
        } else {

        }
      });
  }

  ngOnInit() {
    this.service.subscribe({
      next: message => {
        let chatWith = this.account.username === message.from ? message.to : message.from;
        let isExistingChat = false;
        this.allChats.forEach(chat => {
          if (chat.chatWith === chatWith) {
            chat.messages.push(message);
            isExistingChat = true;
          }
        });

        if (!isExistingChat) {
          this.allChats.push({
            chatWith,
            messages: [message],
          })
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

  sendMessage(messageForm: NgForm) {
    if (messageForm.valid) {
      const message = {
        from: this.account.username,
        to: this.currentChat.chatWith,
        text: messageForm.controls.message.value,
      };
      this.service.sendMessage(message);
      messageForm.controls.message.setValue('');
    }
  }

  scrollToBottom() {
    let chatField = document.querySelector('.message-field');
    if (chatField)
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
    const until$ = new ReplaySubject<boolean>();
    this.isModalOpen = true;
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
            }
            this.setCurrentChat(result);
          }

          until$.next(true);
          until$.complete();
        }, err => null,
        () => {
          this.isModalOpen = false;
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

  private isExistingChat(username): boolean {
    return !!this.allChats.find(chat => chat.chatWith === username);
  }

  containsYoutube(url: string): boolean {
   return new RegExp('http(?:s?):\\/\\/(?:www\\.)?youtu(?:be\\.com\\/watch\\?v=|\\.be\\/)([\\w\\-\\_]*)(&(amp;)?‌​[\\w\\?‌​=]*)?').test(url);

  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
    this.store.dispatch(new LogOutUser());
    this.service.disconnect();
  }

  getSelected(chat: IChat): string {
    if (!this.currentChat) {
      return '';
    }
    return chat.chatWith === this.currentChat.chatWith ? ' current-chat' : '';
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isValidWidth = window.innerWidth >= 770;
  }

  handleFileInput(files: FileList) {
    console.log(files);
    this.service.sendFile(files.item(0));
    //this.fileToUpload = files.item(0);
  }
}
