import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  chats = [
    {title:"Chat One"},
    {title:"Chat Two"},
    {title:"Chat Three"},
    {title:"Chat Four"},
  ]

  constructor() { }

  ngOnInit() {
    const account = JSON.parse(localStorage.getItem('account'));
    if(account == null) {
      window.location.href = '/login';
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.chats, event.previousIndex, event.currentIndex);
  }

}
