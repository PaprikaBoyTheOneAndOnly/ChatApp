import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {IAccount, IAddressable, IChat, Icon, IFile, IMessage} from '../data-model';
import {Observer, ReplaySubject} from 'rxjs';
import {ChatService} from '../services/app.chat-service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {select, Store} from '@ngrx/store';
import {getAccount, IClientState} from '../store/login.reducer';
import {takeUntil} from 'rxjs/operators';
import {ChatModalComponent} from './chat-modal/chat-modal.component';
import {LogOutUser} from '../store/login.action';
import {NgForm} from '@angular/forms';
import {DomSanitizer} from "@angular/platform-browser";
import {UploadFileModalComponent} from "./upload-file-modal/upload-file-modal.component";

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
  private icon = Icon;

  private messageObserver: Observer<IMessage> = {
    next: message => this.handleReceiveMessage(message),
    error: err => { this.error = err; },
    complete: null,
  };

  private fileObserver: Observer<IFile> = {
    next: file => this.handleReceiveFile(file),
    error: err => { this.error = err; },
    complete: null,
  };

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

              this.setCurrentChat("Username");
              sub$.next(true);
              sub$.complete();
            });
        } else {

        }
      });
  }

  ngOnInit() {
    this.service.subscribe(this.messageObserver , this.fileObserver);
  }

  handleReceiveMessage(message: IMessage) {
    this.addToCurrentChat(message);
    this.error = '';
  }

  handleReceiveFile(file: IFile) {
    this.addToCurrentChat(file);
    this.error ='';
  }

  addToCurrentChat(addressable: IAddressable) {
    let chatWith = this.account.username === addressable.from ? addressable.to : addressable.from;
    let isExistingChat = false;
    this.allChats.forEach(chat => {
      if (chat.chatWith === chatWith) {
        chat.addressableList.push(addressable);
        isExistingChat = true;
      }
    });

    if (!isExistingChat) {
      this.allChats.push({
        chatWith,
        addressableList: [addressable],
      })
    }

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
                addressableList: [],
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

  isExistingChat(username): boolean {
    return !!this.allChats.find(chat => chat.chatWith === username);
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

  openUploadFile() {
    const until$ = new ReplaySubject<boolean>();
    this.isModalOpen = true;
    this.dialog.open(UploadFileModalComponent, {data: {}})
      .afterClosed()
      .pipe(takeUntil(until$))
      .subscribe(result => {
          if (result) {
            this.service.sendFile(result, this.account.username, this.currentChat.chatWith);
          }
          until$.next(true);
          until$.complete();
        }, err => null,
        () => {
          this.isModalOpen = false;
        });
  }

  isAMessage(addressable: IAddressable) {
    return 'text' in addressable;
  }
}
